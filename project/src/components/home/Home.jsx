import React from "react";
import "./Home.css";
import CitiesSlider from "../corosel/CitiesSlider";
import Footer from "../footer/Footer";
import HomeSection from "./HomeSection";
import FoodGallery from "./FoodGallery";
import FoodCategories from "./FoodCategory";
import Newsletter from "./Newsletter"; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <CitiesSlider />
        <HomeSection />
        <FoodCategories />
        <Newsletter />
        <FoodGallery />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
