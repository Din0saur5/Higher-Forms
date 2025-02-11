import React, { useState, useRef } from "react";



const CodeVerification = ({ setValidationPage, setProduct, supabase }) => {
    const SUPABASE_URL = import.meta.env.VITE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_ANON;
    console.log(typeof setProduct);

    const [code, setCode] = useState(""); // Single string for the 6-character code
    const [showToast, setShowToast] = useState(false); // State to show toast
    const [toastClass, setToastClass] = useState("opacity-0"); // Toast animation class
    const inputRefs = [];

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Allow only letters and numbers
        if (!value) return;

        const newCode = code.split("");
        newCode[index] = value[0]; // Replace value at current index
        setCode(newCode.join("")); // Join back to string

        // Move focus to the next input
        if (index < 5) inputRefs[index + 1]?.focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newCode = code.split("");
            newCode[index] = ""; // Clear value at index
            setCode(newCode.join(""));
            if (index > 0) inputRefs[index - 1]?.focus(); // Move focus to the previous input
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData
            .getData("text")
            .replace(/[^a-zA-Z0-9]/g, "") // Allow only valid characters
            .slice(0, 6);

        const newCode = pasteData.padEnd(6, "").split("");
        setCode(newCode.join("")); // Set the full code

        // Update each input value and move focus
        newCode.forEach((char, index) => {
            if (inputRefs[index]) {
                inputRefs[index].value = char;
            }
        });
        inputRefs[Math.min(newCode.length, 5)]?.focus(); // Focus the last valid input
    };

    const fetchProduct = async (code) => {
        const formattedCode = code.trim().toLowerCase();

        const fetchProductUrl = `${SUPABASE_URL}/rest/v1/product_validations?select=*&product_id=eq.${encodeURIComponent(formattedCode)}`;

        try {
            // Fetch product data
            const fetchResponse = await fetch(fetchProductUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                },
            });

            if (!fetchResponse.ok) {
                throw new Error(`Error fetching product: ${fetchResponse.status} - ${fetchResponse.statusText}`);
            }

            const productData = await fetchResponse.json();

            if (!productData || productData.length === 0) {
                setProduct(null);
                console.log("Product not found or error.");
                setValidationPage(true);
                return;
            }

            // Set product data
            console.log("Product data:", productData);
            const product = productData[0]; // Assuming `productData` is an array with a single product
            setProduct(product);

            const updateProductUrl = `${SUPABASE_URL}/rest/v1/product_validations?product_id=eq.${encodeURIComponent(product.product_id)}`
            if (product.product_id !== "abc123") {
                // Update been_verified
                console.log(product.been_verified)
                console.log(product.been_verified + 1)
                const updateData = product.been_verified + 1
                const updateResponse = await fetch(updateProductUrl, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        apikey: SUPABASE_KEY,
                        Authorization: `Bearer ${SUPABASE_KEY}`,
                    },
                    body: JSON.stringify({
                        "been_verified": updateData,
                    }),
                });

                if (!updateResponse.ok) {
                    throw new Error(`Error updating been_verified: ${updateResponse.status} - ${updateResponse.statusText}`);
                }

                const updatedData = await updateResponse.json();
                console.log("Update successful:", updatedData);
            }
        } catch (error) {
            console.error("Unexpected error:", error.message);
        }

        // Redirect to validation page
        setValidationPage(true);
    };

    const inputRef = useRef();

    const hideKeyboard = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (code.length === 6) {
            setShowToast(false);
            console.log(code)
            hideKeyboard()
            await fetchProduct(code); // Fetch product data
        } else {
            setShowToast(true); // Show the toast
            setToastClass("opacity-100"); // Fade in the toast
            setTimeout(() => {
                setToastClass("opacity-0"); // Fade out the toast
                setTimeout(() => setShowToast(false), 500); // Remove after fade-out
            }, 1000);
        }
    };

    return (
        <div className="h-90 flex items-center justify-center bg-base p-4">
            {showToast && (
                <div
                    className={`toast toast-top toast-center fixed top-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${toastClass}`}
                >
                    <div className="alert alert-warning">
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
                        <span>Warning: Please enter a 6-character code!</span>
                    </div>
                </div>
            )}
            <div className="bg-primary shadow-md shadow-gray-500 border border-gray-500 rounded-lg border- p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Verify Your Product</h2>
                <p className="text-gray-600 text-center mb-6">
                    Enter the 6-character code found inside your product's box.
                </p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex justify-center gap-2 mb-6">
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs[index] = el)} // Assign refs dynamically
                                type="text"
                                maxLength="1"
                                value={code[index] || ""} // Controlled input
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={index === 0 ? handlePaste : null} // Paste only in the first input
                                className="w-12 h-12 text-xl text-primary text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-accent uppercase"
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-accent text-white font-semibold rounded-md hover:bg-success transition"
                    >
                        Verify Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CodeVerification;