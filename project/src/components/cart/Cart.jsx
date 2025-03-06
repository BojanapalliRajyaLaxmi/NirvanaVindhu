import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("tokenlogin");
        if (!token) return;

        const response = await fetch("https://backend-2-h6m8.onrender.com/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;
        const data = await response.json();
        setCart(data.cart || []);
      } catch (error) {
        console.error("Error fetching cart", error);
      }
    };
    fetchCart();
  }, []);
  const increaseQuantity = (itemName) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // ✅ Function to decrease quantity
  const decreaseQuantity = (itemName) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const handleRemoveFromCart = (itemName) => {
    setCart(cart.filter((item) => item.name !== itemName));
  };

  return (
    <div className="cart-container">
      {/* Left Side - Cart Items */}
      <div className="cart-left">
        <h2 className="cart-title">🛒 Your Cart</h2>
  
        {cart.length === 0 ? (
          <p className="cart-message">Your cart is empty. Add some delicious items! 🍔</p>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.name} className="cart-card">
                {/* Left Section: Image and Name */}
                <div className="cart-left-section">
                  <img className="cart-image" src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                </div>
  
                {/* Right Section: Quantity and Remove */}
                <div className="cart-details">
                  <div className="cart-quantity">
                    <button className="quantity-btn decrease" onClick={() => decreaseQuantity(item.name)}>-</button>
                    <span className="quantity-value">{item.quantity || 1}</span>
                    <button className="quantity-btn increase" onClick={() => increaseQuantity(item.name)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveFromCart(item.name)}>Remove ❌</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Right Side - Order Summary */}
      <div className="cart-right">
        <h3 className="total-price">Total Price: ₹{cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)}</h3>
  
        {/* Coupon Section */}
        <div className="coupon-section">
          <input type="text" className="coupon-input" placeholder="Enter coupon code" />
          <button className="apply-coupon-btn">Apply Coupon</button>
        </div>
  
        {/* Order Now Button */}
        <button className="pay-now-btn" onClick={() => navigate("/payment")}>Order Now 🚀</button>
      </div>
    </div>
  );
  
};

export default Cart;
