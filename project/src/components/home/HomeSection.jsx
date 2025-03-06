import React from "react";
import "./homesection.css";

const HomeSection = () => {
  return (
    <div className="home-section">
      <div className="container-fluid">
        <div className="grid-banner-page">
          {/* Image Section */}
          <div className="dt-sc-grid-banner-image">
            <img
              src="https://orgass.myshopify.com/cdn/shop/files/home-background-image-2.png?v=1641280593"
              alt="Organic Food"
            />
          </div>

          {/* Text Content Section */}
          <div className="dt-sc-grid-banner-content">
            <h4 className="dt-sc-sub-title">About Us</h4>
            <h3 className="dt-sc-main-title">New, Nutritious, Organic Sweetest Food</h3>
            <p className="dt-sc-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
              gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
            <a href="/collections/popular-products" className="dt-sc-btn">
              Read more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
