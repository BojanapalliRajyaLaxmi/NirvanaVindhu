import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './WishlistRestaurant.css'; 

const WishlistRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("tokenlogin");
        if (!token) {
            console.warn("No token found, redirecting to login...");
            navigate("/login");
            return;
        }
        fetchLikedRestaurants(token);
    }, [navigate]);

    const fetchLikedRestaurants = async (token) => {
        try {
            const response = await fetch("http://localhost:3002/restaurant", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.error("Unauthorized: Token may be invalid or expired.");
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }
                throw new Error(`Error fetching restaurants: ${response.status}`);
            }

            const data = await response.json();
            setRestaurants(data.restaurants || []);
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    };

    return (
        <div className="wishlistcontainer">
            <h2 className="wishlist-title">Liked Restaurants</h2>
            {restaurants.length === 0 ? (
                <p className="no-restaurants">No liked restaurants found.</p>
            ) : (
                <ul className="restaurant-list">
                    {restaurants.map((restaurant, index) => (
                        <li key={index} className="restaurant-item">
                            <h3>{restaurant.name}</h3>
                            <p>Cuisine: {restaurant.cuisine}</p>
                            <p>Location: {restaurant.location}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WishlistRestaurants;
