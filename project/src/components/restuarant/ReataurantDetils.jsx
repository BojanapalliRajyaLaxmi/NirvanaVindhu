import React from "react";

const RestaurantDetails = ({ restaurant, onClose }) => {
  return (
    <div className="restaurant-details">
      <button className="close-btn" onClick={onClose}>❌</button>
      <li className="restaurant-item">
        <div className="restaurant-image-container">
          <img
            src={restaurant.image}
            alt="Restaurant"
            className="restaurant-image"
          />
          <div className="restaurant-icons">
            <span className="wishlist-icon">❤️</span>
            <span className="add-to-cart-icon">🛒</span>
            <span className="map-icon">🗺️</span>
          </div>
        </div>
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <p className="restaurant-cuisine">🍽️ {restaurant.cuisine}</p>
        <p className="restaurant-address">📍 {restaurant.address}</p>
      </li>
    </div>
  );
};

export default RestaurantDetails;
