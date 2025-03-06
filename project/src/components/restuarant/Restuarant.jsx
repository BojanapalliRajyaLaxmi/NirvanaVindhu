import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./restuarant.css";
import axios from "axios";
import Breadcrumb from "./ResSlide";
import UserLocation from "../location/userLocation";
import Footer from "../footer/Footer";

import { useNavigate } from "react-router-dom";
const OPENCAGE_API_KEY = "9828b2b94eb148eea5732cb0209e8eb8";

const Restaurant = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [distance, setDistance] = useState(1000);
  const token = localStorage.getItem("tokenlogin");
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setUserLocation(coords);
          getUserAddress(coords.lat, coords.lon);
          fetchRestaurants(coords.lat, coords.lon);
        },
        () => {
          setError("Permission denied or location unavailable");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };
  const handleShowMap = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowMapModal(true);
  };
  const handleCloseMapModal = () => {
    setShowMapModal(false);
  };

  const getUserAddress = async (lat, lon) => {
    try {
      let response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_API_KEY}`
      );
      let data = await response.json();

      if (data.results.length > 0) {
        setUserAddress(data.results[0].formatted);
      } else {
        setUserAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching user address:", error);
      setUserAddress("Error fetching address");
    }
  };

  const getRestaurantAddress = async (lat, lon) => {
    try {
      let response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_API_KEY}`
      );
      let data = await response.json();

      if (data.results.length > 0) {
        return data.results[0].formatted;
      } else {
        return "Address not found";
      }
    } catch (error) {
      console.error("Error fetching restaurant address:", error);
      return "Error fetching address";
    }
  };
  const restaurantImages = [
    "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/914388/pexels-photo-914388.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/984888/pexels-photo-984888.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/734562/pexels-photo-734562.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1546039/pexels-photo-1546039.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1402407/pexels-photo-1402407.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4676640/pexels-photo-4676640.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4913313/pexels-photo-4913313.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2504911/pexels-photo-2504911.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1741285/pexels-photo-1741285.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1055054/pexels-photo-1055054.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4255489/pexels-photo-4255489.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1296543/pexels-photo-1296543.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1833320/pexels-photo-1833320.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1546360/pexels-photo-1546360.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2923034/pexels-photo-2923034.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/390658/pexels-photo-390658.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2067431/pexels-photo-2067431.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3044536/pexels-photo-3044536.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2564252/pexels-photo-2564252.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2878738/pexels-photo-2878738.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1843655/pexels-photo-1843655.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1841184/pexels-photo-1841184.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1801106/pexels-photo-1801106.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2888679/pexels-photo-2888679.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const fetchRestaurants = async (lat, lon, range) => {
    try {
      let response = await fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="restaurant"](around:${range},${lat},${lon});out;`
      );
      let data = await response.json();

      if (data.elements.length > 0) {
        const enrichedRestaurants = await Promise.all(
          data.elements.map(async (restaurant) => {
            const { lat, lon, tags } = restaurant;
            const address = await getRestaurantAddress(lat, lon);
            const randomImage =
              restaurantImages[
                Math.floor(Math.random() * restaurantImages.length)
              ];
            return {
              name: tags.name || "Small Hotel",
              cuisine: tags.cuisine || "All Dishes Available",
              address,
              lat,
              lon,
              image: randomImage,
            };
          })
        );

        setRestaurants(enrichedRestaurants);
      } else {
        setRestaurants([]);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setRestaurants([]);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []); // Runs once on mount
  
  useEffect(() => {
    if (userLocation) {
      fetchRestaurants(userLocation.lat, userLocation.lon, distance);
    }
  }, [distance, userLocation]); // Ensures updates when distance/location changes
  
  const handleShowModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRestaurant(null);
  };
  useEffect(() => {
    checkIfLiked();
  }, []);

  const checkIfLiked = async () => {
    try {
      if (!token) {
        console.error("No token found.");
        return;
      }

      const response = await fetch("http://localhost:3002/restaurant", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.restaurants) {
        setLikedRestaurants(data.restaurants.map((item) => item.name));
      }
    } catch (error) {
      console.error("Error checking liked status:", error.message);
    }
  };

  useEffect(() => {
    if (selectedRestaurant) {
      checkIfLiked();
    }
  }, [selectedRestaurant]);

  const toggleLike = async (restaurant) => {
    try {
      const isAlreadyLiked = likedRestaurants.includes(restaurant.name);
      let updatedList = [...likedRestaurants];

      if (isAlreadyLiked) {
        updatedList = updatedList.filter((name) => name !== restaurant.name);
        await axios.delete(
          `http://localhost:3002/restaurant/${restaurant.name}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        updatedList.push(restaurant.name);
        await axios.post(
          "http://localhost:3002/restaurant",
          {
            restaurant: {
              name: restaurant.name,
              id: restaurant.id || restaurant.name,
            },
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setLikedRestaurants(updatedList);
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  useEffect(() => {
    if (showWishlist) {
      checkIfLiked();
    }
  }, [likedRestaurants]);
  const handleDistanceChange = (e) => {
    setDistance(Number(e.target.value));
    if (userLocation) {
      fetchRestaurants(userLocation.lat, userLocation.lon, Number(e.target.value));
    }
  };
  
  return (
    <div className="restaurant-wrapper">
      {/* Fixed Section */}
      <div className="fixed-header">
        {/* <h1>📍 Nearby Restaurants</h1> */}
        <Breadcrumb />
        {/* <WishlistRestaurants/> */}
        {error && <p className="error">{error}</p>}
        {userLocation && (
          <>
            <p className="user-address">
              🏠  {userAddress || "Fetching address..."}
            </p>
          </>
        )}

        <div className="distance-dropdown">
          <select
            className="form-select"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          >
            {[1000, 2000, 3000, 4000,5000,6000,7000,8000].map((range) => (
              <option key={range} value={range}>
                {range} m
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="wishlist-toggle">
      <button className="btn btn-primary" onClick={() => navigate("/WishlistRestaurants")}>
  View Wishlist
</button>

    </div>
      {userLocation ? (
        restaurants.length > 0 ? (
          <ul className="restaurant-list">
            {restaurants.map((restaurant, index) => (
              <li key={index} className="restaurant-item">
                <div className="restaurant-image-container">
                  <img
                    src={restaurant.image}
                    alt="Restaurant"
                    className="restaurant-image"
                  />
                  <div className="restaurant-icons">
                    <span
                      className="wishlist-icon"
                      onClick={() => toggleLike(restaurant)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={
                          likedRestaurants.includes(restaurant.name)
                            ? "https://img.icons8.com/?size=80&id=dKjAZULRJlO7&format=png" 
                            : "https://img.icons8.com/?size=80&id=G3rOvlDYR75Z&format=png" // Empty Heart (Not Liked)
                        }
                        alt="Wishlist Icon"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </span>

                    <span
                      className="view-more-icon"
                      onClick={() => handleShowModal(restaurant)}
                      style={{ cursor: "pointer" }}
                    >
                      👁️
                    </span>
                    <span className="add-to-cart-icon">🛒</span>
                    <span
                      className="map-icon"
                      onClick={() => handleShowMap(restaurant)}
                      style={{ cursor: "pointer" }}
                    >
                      🗺️
                    </span>
                  </div>
                </div>
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-cuisine">🍽️ {restaurant.cuisine}</p>
                <p className="restaurant-address">📍 {restaurant.address}</p>
              </li>
            ))}
          </ul>
        ) : (
         



          <p>No restaurants found</p>
        )
      ) : (
        <p>Getting location...</p>
      )}

      {/* Bootstrap Modal for Restaurant Details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Restaurant Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRestaurant && (
            <>
              <h3>{selectedRestaurant.name}</h3>
              <p>
                <strong>Cuisine:</strong> {selectedRestaurant.cuisine}
              </p>
              <p>
                <strong>Address:</strong> {selectedRestaurant.address}
              </p>
              <iframe
                width="100%"
                height="300"
                style={{ border: "0" }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  selectedRestaurant.lon - 0.01
                },${selectedRestaurant.lat - 0.01},${
                  selectedRestaurant.lon + 0.01
                },${selectedRestaurant.lat + 0.01}&layer=mapnik&marker=${
                  selectedRestaurant.lat
                },${selectedRestaurant.lon}`}
              ></iframe>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showMapModal} onHide={handleCloseMapModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Map View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRestaurant && (
            <UserLocation destination={selectedRestaurant} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMapModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
};

export default Restaurant;
