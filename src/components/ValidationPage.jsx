import React, { useEffect, useState } from "react";
import { IoWarningOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import { SlInfo } from "react-icons/sl";
import JSConfetti from 'js-confetti'
import { motion } from "framer-motion";
import { BsXOctagon } from "react-icons/bs";
import { useUserContext } from "./UserContext";
import { updateFormCoins, PatchUser, AddCoins } from "../../api"; // Import API functions

function ValidationPage({ setValidationPage, clearProduct, product }) {
    const { userData, setUserData } = useUserContext(); 
    const [productRedeemed, setProductRedeemed] = useState(product.been_redeemed);
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState(null);
    const [animate, setAnimate] = useState(false);
    const [coins, setCoins] = useState([]);
    const jsConfetti = new JSConfetti();

    const handleBack = () => {
        setValidationPage(false);
        clearProduct();
    };

    const handleReplayToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        if (product && product.been_verified === 0) {
            jsConfetti.addConfetti({
                confettiColors: [
                    '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
                ],
            })
        }
    };

    const handleRedeem = async () => {
        try {
            const coins = await AddCoins(product.product_id, userData.id)

            setAnimate(false);
            setCoins(Array.from({ length: 25 }, (_, i) => ({
                x: Math.random() * 500,
                y: -Math.random() * 1000 - 500,
                delay: Math.random() * 0.5,
            })));
            setTimeout(() => setAnimate(true), 50);
            setTimeout(() => setProductRedeemed(true), 3000);
        } catch (error) {
            console.error("Error redeeming coins:", error);
        }
    };

    useEffect(() => {
        if (product === null) {
            setToastType("error");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } else if (product?.been_verified > 0) {
            setToastType("warning");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } else if (product && product.been_verified === 0) {
            setToastType("success");
            setShowToast(true);
            jsConfetti.addConfetti({
                confettiColors: [
                    '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
                ],
            });
            setTimeout(() => setShowToast(false), 2000);
        }
    }, [product]);

    const borderColor = {
        error: "border-error",
        warning: "border-warning",
        success: "border-success",
    }[toastType] || "border-neutral";

    const shadowColor = {
        error: "shadow-inner-glow shadow-error",
        warning: "shadow-inner-glow shadow-warning",
        success: "",
    }[toastType] || "shadow-neutral";

    const textColor = {
        error: "text-error",
        warning: "text-warning",
        success: "text-success",
    }[toastType] || "text-neutral";

    return (
        <div className={`relative mt-48  sm:h-screen text-white ${borderColor} px-[10%] pt-0 pb-[10%] z-10 ${shadowColor}`}>
            {/* Back Button */}
            <button onClick={handleBack} className="absolute top-4 left-6 sm:left-12 text-3xl hover:scale-150 transition-all">
                <IoArrowBackCircleOutline />
            </button>

            {/* Info Button */}
            <button onClick={handleReplayToast} className={`absolute top-4 sm:right-12 right-6 text-3xl hover:scale-110 transition-all ${textColor}`}>
                <SlInfo />
            </button>

            {/* Product Display */}
            <div className="flex flex-col items-center justify-center h-100">
                {product ? (
                    product.been_verified > 0 ? (
                        <div className="flex card m-40 sm:m-[10%] sm:mb-0 h-1/2 border-2 border-warning">
                            <div className="card-body max-sm:w-[80vw] items-center text-center">
                                <IoWarningOutline className="text-5xl text-warning" />
                                <p>
                                    This code has already been used <span className="font-semibold">{product.been_verified}</span> time{product.been_verified > 1 ? "s" : ""} to verify a <br /><br />
                                    <span className="font-semibold">{product.product_name}</span><br /><br />
                                    <span className="font-semibold">Batch ID:</span> {product.batch_id}<br />
                                    <span className="font-semibold">Batch Date:</span> {product.batch_date}<br />
                                    If you were the one who previously verified this product, there’s no need to worry. However, if you’re seeing this message and you haven’t verified this product before, please contact HIGHER FORMS support immediately. This could indicate a counterfeit product.
                                </p>
                                {productRedeemed ? (
                                    <div className="tooltip tooltip-bottom" data-tip="Form Coins Have already been redeemed">
                                        <button className="btn btn-disabled mb-48">Redeem</button>
                                    </div>
                                ) : userData ? (
                                    <div className="tooltip" data-tip="Use Form Coins to redeem rewards in the Rewards shop!">
                                        <motion.button onClick={handleRedeem()} className="btn btn-success mb-48">
                                            Redeem {`(+${product.points} points)`}
                                        </motion.button>
                                        {coins.map((coin, index) => (
                                            <motion.div
                                                key={index}
                                                className="absolute w-5 h-5 flex items-center justify-center font-bold text-yellow-400 bg-yellow-600 border-2 border-yellow-400 rounded-full"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={
                                                    animate
                                                        ? {
                                                            opacity: [0, 1, 1, 0],
                                                            x: [0, coin.x],
                                                            y: [0, coin.y], // Coins move upward
                                                            rotate: [0, 1080],
                                                            scale: [1, 1.2, 1],
                                                        }
                                                        : {}
                                                }
                                                transition={{
                                                    duration: 3,
                                                    delay: coin.delay,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="tooltip tooltip-bottom" data-tip="Signup or Login to Redeem Form Points for rewards">
                                        <button className="btn btn-disabled mb-48">Redeem</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center max-sm:mt-24">
                            <video src={product.graphic} autoPlay muted playsInline loop className="max-w-[40%] max-sm:w-[1000%] sm:w-3/4" />
                            <h2 className={`text-2xl text-white text-center mb-2 mt-4`}>{product.product_name}</h2>
                            <p className="font-semibold text-white">Batch ID: <span >{product.batch_id} </span> </p> 
                            <p className="font-semibold ml-2 text-white">Batch Date:</p> {product.batch_date}<br />
                            {productRedeemed ? (
                                <div className="tooltip" data-tip="Form Coins Have already been redeemed">
                                    <button className="btn btn-disabled mb-48">Redeem</button>
                                </div>
                            ) : userData ? (
                                <div className="tooltip" data-tip="Use Form Coins to redeem rewards in the Rewards shop!">
                                    <motion.button onClick={()=>handleRedeem()} className="btn btn-success mb-48">
                                        Redeem {`(+${product.points} points)`}
                                    </motion.button>
                                    {coins.map((coin, index) => (
                                        <motion.div
                                            key={index}
                                            className="absolute w-5 h-5 flex items-center justify-center font-bold text-yellow-400 bg-yellow-600 border-2 border-yellow-400 rounded-full"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={
                                                animate
                                                    ? {
                                                        opacity: [0, 1, 1, 0],
                                                        x: [0, coin.x],
                                                        y: [0, coin.y], 
                                                        rotate: [0, 1080],
                                                        scale: [1, 1.2, 1],
                                                    }
                                                    : {}
                                            }
                                            transition={{
                                                duration: 3,
                                                delay: coin.delay,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="tooltip" data-tip="Signup or Login to Redeem Form Coins for rewards">
                                    <button className="btn btn-disabled mb-48">Redeem</button>
                                </div>
                            )}
                        </div>
                    )
                ) : (
                    <div className="flex m-40 sm:m-24 sm:mb-0 card w-3/4 border-2 border-error">
                        <div className="card-body items-center text-center">
                            <BsXOctagon className="text-5xl text-error" />
                            <p>Unfortunately, the product you have tried to verify is not authentic.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ValidationPage;
