import React, { useState } from "react";

const RewardShop = () => {
  // Mock product data
  const products = [
    { id: 1, name: "Premium Strain Sample", points: 100, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Merch T-Shirt", points: 200, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Exclusive Access Pass", points: 500, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Gift Voucher", points: 300, image: "https://via.placeholder.com/150" },
  ];

  // Mock user points
  const [userPoints, setUserPoints] = useState(600);

  // Cart state
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      alert("This item is already in your cart.");
      return;
    }

    if (userPoints >= product.points) {
      setCart([...cart, product]);
    } else {
      alert("Not enough points to add this item.");
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Checkout handler
  const checkout = () => {
    const totalPoints = cart.reduce((total, item) => total + item.points, 0);

    if (userPoints >= totalPoints) {
      setUserPoints(userPoints - totalPoints);
      setCart([]);
      alert("Checkout successful! Enjoy your rewards.");
    } else {
      alert("Not enough points to complete the checkout.");
    }
  };

  return (
    <div className="reward-shop-container bg-black text-white font-roboto min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-gold">Rewards Shop</h1>
        <p className="text-lg mt-4">Redeem your points for exclusive rewards!</p>
        <hr className="mt-4 border-t border-gray-600 mx-auto w-3/4" />
      </div>

      {/* User Points */}
      <div className="text-center mb-8">
        <p className="text-xl font-semibold">Your Points: <span className="text-gold">{userPoints}</span></p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-gray-800 p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.name} className="rounded-lg mb-4 object-cover w-full h-40" />
            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-sm text-gray-400 mb-4">Points: {product.points}</p>
            <button
              onClick={() => addToCart(product)}
              className="btn btn-primary w-full text-sm"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-12 bg-gray-900 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-400">Points: {item.points}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-secondary text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={checkout}
              className="btn btn-primary mt-6 w-full"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardShop;
