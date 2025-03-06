import React from "react";
import "./foodGallery.css";

const FoodGallery = () => {
  return (
    <div
      className="custom-wrapper dt-sc-section-wrapper lazyloaded"
      style={{
        backgroundPosition: "center center",
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "url('https://orgass.myshopify.com/cdn/shop/files/home-background-image-7.png?v=1641292799')",
      }}
    >
      <div className="container-fluid spacing_enabled">
        <div className="row custom-home-page">
          <div className="home-custom-section-wrapper dt-sc-column">
            {/* Left Block - Text & Heading */}
            <div className="dt-sc-custom-block content-block">
              <div className="dt-sc-heading text-start">
                <h2 className="dt-sc-main-heading">
                  We hope good tasty food makes clients happier
                </h2>
                <p className="dt-sc-heading-description">
                  Massa ultricies mi quis hendrerit dolor magna eget est. Eget mauris
                  pharetra et ultrices. Scelerisque fermentum dui faucibus in ornare quam viverra.
                </p>
              </div>

              {/* Image Gallery Block 1 */}
              <div className="dt-sc-image-gallery">
                <div className="left-block-img">
                  <a href="#">
                    <img
                      className="dt-sc-block-image"
                      src="https://orgass.myshopify.com/cdn/shop/files/home-image-4.jpg?v=1641292944"
                      alt="Food Image 1"
                    />
                  </a>
                </div>

                <div className="left-block-img">
                  <a href="#">
                    <img
                      className="dt-sc-block-image"
                      src="https://orgass.myshopify.com/cdn/shop/files/home-image-5.jpg?v=1641292962"
                      alt="Food Image 2"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Block - Image Gallery */}
            <div className="dt-sc-custom-block content-block">
              <div className="dt-sc-image-gallery">
                <div className="left-block-img">
                  <a href="#">
                    <img
                      className="dt-sc-block-image"
                      src="https://orgass.myshopify.com/cdn/shop/files/home-image-6.jpg?v=1641292996"
                      alt="Food Image 3"
                    />
                  </a>
                </div>

                <div className="left-block-img">
                  <a href="#">
                    <img
                      className="dt-sc-block-image"
                      src="https://orgass.myshopify.com/cdn/shop/files/home-image-7.jpg?v=1641293014"
                      alt="Food Image 4"
                    />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodGallery;
