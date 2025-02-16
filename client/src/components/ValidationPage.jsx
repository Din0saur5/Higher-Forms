import React, { useEffect, useState } from "react";
import { IoWarningOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import { SlInfo } from "react-icons/sl";
import JSConfetti from 'js-confetti'
import { motion } from "framer-motion";
import { BsXOctagon } from "react-icons/bs";
import { useUserContext } from "./UserContext";
import { GoInfo } from "react-icons/go";

function ValidationPage({ setValidationPage, clearProduct, product }) {
    const { userData, setUserData } = useUserContext(); 
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState(null); // Tracks which alert to show
    const [animate, setAnimate] = useState(false);
    const [coins, setCoins] = useState([]);
    const jsConfetti = new JSConfetti()
    const handleBack = () => {
        setValidationPage(false);
        clearProduct(); // Clear product state
    };

    const handleReplayToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000); // Replay toast for 2 seconds
        if (product && product.been_verified === 0) {
            jsConfetti.addConfetti({
                confettiColors: [
                    '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
                ],
            })
        }
    };


    
    const handleRedeem = ()=> {
        setAnimate(false); 
        setCoins(Array.from({ length: 25 }, (_, i) => ({
            x: Math.random() * 500,
            y: -Math.random() * 1000 - 500,
            delay: Math.random() * 0.5,
        })));
        setTimeout(() => setAnimate(true), 50);
    }

    useEffect(() => {
        if (product === null) {
            setToastType("error");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
        } else if (product?.been_verified > 0) {
            setToastType("warning");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
        } else if (product && product.been_verified === 0) {
            setToastType("success");
            setShowToast(true);

            jsConfetti.addConfetti({
                confettiColors: [
                    '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
                ],
            })
            setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
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

    const NameColor = {
        error: "productError",
        warning: "productWarning",
        success: "productSuccess",
    }[toastType] || "text-neutral";

    return (
       
        <div className={`relative mt-48  h-full sm:h-screen text-white ${borderColor} px-[10%] pt-0 pb-[10%] z-10  ${shadowColor}  `}>
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="absolute top-4 left-6 sm:left-12 text-3xl hover:scale-150 transition-all"
            >
                <IoArrowBackCircleOutline />
            </button>

            {/* Info Button */}
            <button
                onClick={handleReplayToast}
                className={`absolute top-4 sm:right-12 right-6 text-3xl hover:scale-110 transition-all ${textColor}`}
            >
                <SlInfo />
            </button>

            {/* Toast Alerts */}
            {showToast && toastType === "error" && (
                <div className="w-screen sm:w-10/12  toast toast-top sm:toast-center fixed z-10 sm:top-10 mt-24 left-1/2 transform -translate-x-1/2 transition-opacity duration-500">
                    <div role="alert" className="alert max-sm:w-screen  alert-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Your code is invalid! <br className="sm:hidden" /> The product you have is not from us.</span>
                    </div>
                </div>
            )}

            {showToast && toastType === "warning" && (
                <div className="w-screen sm:w-10/12 toast toast-top sm:toast-center fixed z-10 sm:top-10 mt-24 left-1/2 transform -translate-x-1/2 transition-opacity duration-500">
                    <div role="alert" className="alert max-sm:w-screen  alert-warning">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span className="text-center">Warning: <br className="sm:hidden" /> Code has been used.</span>
                    </div>
                </div>
            )}

            {showToast && toastType === "success" && (
                <div className="w-screen sm:w-10/12 toast toast-top sm:toast-center fixed z-10 sm:top-10 mt-24 left-1/2 transform -translate-x-1/2 transition-opacity duration-500">
                    <div role="alert" className="alert  max-sm:w-screen alert-success">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="text-center">Congratulations! <br className="sm:hidden" />
                            Your Cartridge has been Verified as Authentic</span>
                    </div>
                </div>
            )}

            {/* Product Display */}
            <div className="flex flex-col items-center justify-center h-100">
                {product ?
                    (product.been_verified > 0 ? (
                        <div className="flex card m-40 sm:m-[10%] sm:mb-0  h-1/2 border-2 border-warning">
                            <div className="card-body max-sm:w-[80vw]  items-center text-center ">
                                <IoWarningOutline className=" text-5xl text-warning" />
                                <p> This code has already been used <span className="font-semibold">{product.been_verified}</span> time{product.been_verified > 1 ? "s" : ""} to verify a <br /><br /><span className="font-semibold">{product.product_name}</span><br /><br /> If you were the one who previously verified this product, there’s no need to worry. However, if you’re seeing this message and you haven’t verified this product before, please contact HIGHER FORMS support immediately. This could indicate a counterfeit product.
                                </p>
                                {product.been_redeemed?(
                                <div className="tooltip tooltip-bottom" data-tip="Form Coins Have already been redeemed">
                                <button className="btn btn-disabled mb-48">Redeem</button>
                                </div>
                            ):(
                            
                            
                            userData? (
                                <div className="tooltip " data-tip="Use Form Coins to redeem rewards in the Rewards shop!">
                                <motion.button onClick={()=>handleRedeem()} className="btn btn-success mb-48">Redeem {`(+${product.points} points)`}</motion.button>
                                </div>
                            ):
                            (
                            <div className="tooltip tooltip-bottom" data-tip="Signup or Login to Redeem Form Points for rewards">
                                <button className="btn btn-disabled mb-48">Redeem</button>
                            </div>
                            ))
                            }

                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center max-sm:mt-24">
                            <video
                                src={product.graphic}
                                autoPlay
                                muted
                                playsInline
                                loop
                                className={`max-w-[40%] max-sm:w-[1000%] sm:w-3/4    `}
                            />
                            <h2 className={`text-2xl text-white ${NameColor} text-center mb-14 mt-4 `}>
                                {product.product_name}
                            </h2>
                            {product.been_redeemed?(
                                <div className="tooltip" data-tip="Form Coins Have already been redeemed">
                                <button className="btn btn-disabled mb-48">Redeem</button>
                                </div>
                            ):(
                            
                            
                            userData? (
                              
                            <div className="tooltip " data-tip="Use Form Coins to redeem rewards in the Rewards shop!">
                            
                            <motion.button onClick={()=>handleRedeem()} className="btn btn-success mb-48">Redeem {`(+${product.points} points)`}</motion.button>
                            {coins.map((coin, index) => (
                                <motion.div
                                  key={index}
                                  className="absolute top-6 left-6 w-3 h-3 flex items-center justify-center font-bold text-yellow-400 bg-yellow-600 border-2 border-yellow-400 rounded-full opacity-0"
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={
                                    animate
                                      ? {
                                          opacity: [0, 1, 1, 0],
                                          x: [0, coin.x],  
                                          y: [0, coin.y], // Coins go higher
                                          rotate: [0, 1080],
                                          scale: [1, 1.2, 1],
                                        }
                                      : {}
                                  }
                                  transition={{
                                    duration: 3, // Slower animation (twice as slow)
                                    delay: coin.delay,
                                    ease: "easeInOut",
                                  }}
                                  onAnimationComplete={() => setAnimate(false)}
                                >
                                  
                                </motion.div>
                              ))}
                            </div>
                          
                     
                            ):
                            (
                               
                            <div className="tooltip" data-tip="Signup or Login to Redeem Form Coins for rewards">
                                <button className="btn btn-disabled mb-48">Redeem</button>
                            </div>
                        
                            ))
                            }
                                   
                        </div>

                    )) : (
                        <div className="flex m-40 sm:m-24 sm:mb-0 card  w-3/4 border-2 border-error">
                            <div className="card-body items-center text-center ">
                                <BsXOctagon className="text-5xl text-error" />
                                <p> Unfortunately, the product you have tried to verify is not authentic. We recommend returning the product to the retailer and reporting this issue to HIGHER FORMS.
                                </p>

                            </div>
                        </div>


                    )}
            </div>
        </div>
       
    );
}

export default ValidationPage;