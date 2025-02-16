import React, { useEffect, useState } from "react";
import { useUserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../api";

const RewardShop = () => {
  const { userData } = useUserContext();
  const navigate = useNavigate();
  const [products, setProducts] = useState([])

  useEffect(()=>{
    handleFetchProducts()
   
  },[])

  const handleFetchProducts = async ()=>{
    const productsF = await fetchProducts()
    setProducts(productsF)
    console.log(productsF)
  }
//   Hey Matt so I have added addToCart(product_varient-id) and removeFromCart(product_varient-id) in api.js 
// these functions add/remove a product id to the cart array in the user table

//SUPER IMPORTANT: yes there is a products table but that is not used for inventory or check out or 
//carts we use the id in product-varient table for specific products
// 
// to get this array you will have to call fn fetchCartProds(cart)
// which will pull all the products in the users cart and have a quantity value that will handle repeats
// the cart input is the array found in userData.cart
// I have also created a fn called placeOrder(userId, email, name, address, cart) this requires the entry 
// of a order form but the fn does all this:
// Validates the cart: Ensures the cart is not empty.
// Fetches product details: Calls fetchCartProds(cart) to get product data with quantities.
// Generates product summary: Creates a list of product names with quantities for order records.
// Calculates total price: Sums up the total cost of all cart items.
// Fetches user balance: Retrieves the user's form_coin_total from the database.
// Checks user balance: Ensures the user has enough Form Coins to complete the purchase.
// Creates an order: Inserts a new entry into the orders table.
// Links products to the order: Inserts each cart item into the order_items table with its quantity and price.
// Reduces inventory: Updates the stock in product_variants based on the items purchased.
// Deducts Form Coins: Subtracts the total price from the user's form_coin_total.
// Clears the cart: Sets the user's cart to an empty array after a successful order.
// Handles errors: Returns appropriate error messages if any step fails.
// Returns success confirmation: Sends back a success response with the orderId if everything works.
// // 


  // // Checkout handler
  // const handleCheckout = async () => {
  //   const totalCost = cart.reduce((total, item) => total + item.price, 0);

  //   if (formCoins < totalCost) {
  //     alert("Not enough Form Coins to complete the checkout.");
  //     return;
  //   }

  //   // Deduct Form Coins and clear the cart
  //   await modifyFormCoins(-totalCost);
  //   await clearCart();

  //   // Navigate to Confirmation Page
  //   navigate("/confirmation");
  // };

  return (
    <div className="reward-shop-container bg-black text-white font-roboto min-h-screen mt-24 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-gold">Rewards Shop</h1>
        <p className="text-lg mt-4">
          {userData ? "Browse exclusive rewards!" : "Please log in or register to access the Rewards Shop."}
        </p>
        <hr className="mt-4 border-t border-gray-600 mx-auto w-3/4" />
      </div>

      {/* If user is not logged in, show login/register message and buttons */}
      {!userData ? (
        <div className="flex flex-col items-center text-center mt-10">
          <p className="text-xl font-semibold text-gray-300">
            Please log in or register to view and redeem rewards.
          </p>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary px-6 py-3 rounded-lg text-lg"
            >
              Log In
            </button>
            
          </div>
        </div>
      ) : (
        <>
          {/* User Form Coins Display */}
          <div className="text-center mb-8">
            <p className="text-xl font-semibold">
              Your Balance: <span className="text-gold">{} Form Coins</span>
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="card bg-gray-800 p-4 rounded-lg shadow-lg">
                <img src={product.image_url} alt={product.name} className="rounded-lg mb-4 object-cover w-full h-40" />
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                <p className="text-sm text-gray-400 mb-4">Price: {product.price} Form Coins</p>
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-primary w-full text-sm"
                  disabled={userData.cart.some((item) => item.id === product.id) || userData.form_coins_total < product.price}
                >
                  {userData.cart.some((item) => item.id === product.id)
                    ? "In Cart"
                    : userData.form_coins_total >= product.price
                    ? "Add to Cart"
                    : "Insufficient Coins"}
                </button>
              </div>
            ))}
          </div>

          {/* Cart Section */}
          <div className="mt-12 bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

            {userData.cart.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {userData.cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-gray-400">Price: {item.price} Form Coins</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-secondary text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <p className="text-lg font-semibold mt-4">
                  Total: {userData.cart.reduce((total, item) => total + item.price, 0)} Form Coins
                </p>

                <button
                  onClick={handleCheckout}
                  className={`btn btn-primary mt-6 w-full ${
                    userData.cart.reduce((total, item) => total + item.price, 0) > formCoins
                      ? "bg-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={userData.cart.reduce((total, item) => total + item.price, 0) > formCoins}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RewardShop;
