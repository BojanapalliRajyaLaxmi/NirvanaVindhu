// import React, { useState, useEffect } from "react";
// import "./wishlist.css";
// import { Heart } from "lucide-react";

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const fetchWishlist = async () => {
//     const token = localStorage.getItem("tokenlogin");
//     if (!token) return;

//     try {
//       const response = await fetch("http://localhost:3002/wishlist", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setWishlist(data.wishlist || []);
//       }
//     } catch (error) {
//       console.error("Error fetching wishlist", error);
//     }
//   };

//   return (
//     <div className="wishlist-page">
//       <h1>My Wishlist</h1>
//       {wishlist.length === 0 ? (
//         <p>No items in wishlist.</p>
//       ) : (
//         <div className="wishlist-container">
//           {wishlist.map((dish, index) => (
//              <article key={index} className="dish-card">
//              <img
//             className="dish-card__background"
//             src={"https://tse1.mm.bing.net/th?id=OIP.OM_YQDFEEZ6NPj0XapYwFgHaEo&pid=Api&P=0&h=180"}
//             alt={dish.name}
//           />

//               <div className="dish-card__content">
//                 <h3 className="dish-card__title">{dish.name}</h3>
//                 <p>description:{dish.description}</p>
//                 <p><strong>Ingredients:</strong> {dish.ingredients?.length ? dish.ingredients.join(", ") : "N/A"}</p>

//                 <p><strong>Price:</strong> ₹{dish.price || "N/A"}</p>
//                 <p><strong>Rating:</strong> ⭐{dish.rating || "N/A"}</p>
//               </div>
//               <Heart
//                 className={`icon wishlist-icon ${wishlist.some((item) => item.id === dish.id) ? "active" : ""}`}
//                 onClick={() => toggleWishlist(dish)}
//               />
//             </article>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;

import React, { useState, useEffect } from "react";
import "./wishlist.css";
import Breadcrumb from "./WishlistSlide";
import { Heart, Trash2 } from "lucide-react"; // Added Trash icon for delete

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("tokenlogin");
    if (!token) return;

    try {
      const response = await fetch("https://backend-2-h6m8.onrender.com/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setWishlist(data.wishlist || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist", error);
    }
  };

  const removeFromWishlist = async (dishId) => {
    const token = localStorage.getItem("tokenlogin");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3002/wishlist/${dishId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setWishlist((prevWishlist) =>
          prevWishlist.filter((dish) => dish._id !== dishId)
        );
      }
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  return (
    <div className="wishlist-page">
      <Breadcrumb/>
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="wishlist-container">
          {wishlist.map((dish) => (
            <article key={dish._id} className="dish-card">
              <img
                className="dish-card__background"
                src={
                 dish.image
                }
                alt={dish.name}
              />

              <div className="dish-card__content">
                <h3 className="dish-card__title">{dish.name}</h3>
                <p>Description: {dish.description}</p>
                <p>
                  <strong>Ingredients:</strong>{" "}
                  {dish.ingredients?.length
                    ? dish.ingredients.join(", ")
                    : "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> ₹{dish.price || "N/A"}
                </p>
                <p>
                  <strong>Rating:</strong> ⭐{dish.rating || "N/A"}
                </p>
              </div>

              <div className="actions">
                <Heart
                  className={`icon wishlist-icon ${
                    wishlist.some((item) => item._id === dish._id)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => removeFromWishlist(dish._id)}
                />
                <Trash2
                  className="icon delete-icon"
                  onClick={() => removeFromWishlist(dish._id)}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
