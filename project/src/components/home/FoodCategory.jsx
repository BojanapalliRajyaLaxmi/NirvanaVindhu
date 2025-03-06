import React from "react";
import './foodcategory.css'
const foodCategories = [
  {
    title: "Breakfast",
    imageSrc: "https://orgass.myshopify.com/cdn/shop/files/home-image-1_600x.png?v=1641282401",
    description: "Start your day with healthy and organic breakfast options.",
    link: "/collections/best-selleres",
  },
  {
    title: "Lunch",
    imageSrc: "https://orgass.myshopify.com/cdn/shop/files/home-image-2_600x.png?v=1641282414",
    description: "Enjoy a hearty and delicious lunch made with fresh ingredients.",
    link: "/collections/latest-products",
  },
  {
    title: "Dinner",
    imageSrc: "https://orgass.myshopify.com/cdn/shop/files/home-image-3_600x.png?v=1641282428",
    description: "End your day with a wholesome and tasty dinner.",
    link: "/collections/new-arrivals",
  },
];

const FoodCategories = () => {
  return (
    <section className="food-section">
        <h2 className="main-heading">Flavorful & Organic Dishes Every Day</h2>
      <div className="container">
        <div className="category-grid">
          {foodCategories.map((category, index) => (
            <div key={index} className="category-card">
              <img src={category.imageSrc} alt={category.title} className="category-image" />
              <h4>{category.title}</h4>
              <p>{category.description}</p>
              <a href={category.link} className="read-more-btn">Read More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;
