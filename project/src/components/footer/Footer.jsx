import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <div className="social-icons">
            <a href="#"><img src="https://www.nicdark-themes.com/themes/restaurant/wp/demo/restaurant/wp-content/uploads/sites/2/2019/01/social-1.png" alt="Facebook" /></a>
            <a href="#"><img src="https://www.nicdark-themes.com/themes/restaurant/wp/demo/restaurant/wp-content/uploads/sites/2/2019/01/social-3.png" alt="Twitter" /></a>
            <a href="#"><img src="https://www.nicdark-themes.com/themes/restaurant/wp/demo/restaurant/wp-content/uploads/sites/2/2019/01/social-2.png" alt="Instagram" /></a>
            <a href="#"><img src="https://www.nicdark-themes.com/themes/restaurant/wp/demo/restaurant/wp-content/uploads/sites/2/2019/01/social-4.png" alt="LinkedIn" /></a>
            <a href="#"><img src="https://www.nicdark-themes.com/themes/restaurant/wp/demo/restaurant/wp-content/uploads/sites/2/2019/01/social-5.png" alt="YouTube" /></a>
          </div>
          <p className="footer-text">STAY TUNED</p>
          <p className="footer-subtext">
          🍕 "You can’t make everyone happy. You’re not pizza."
          </p>
        </div>
        <div className="footer-column center">
          <img src="public/logoVindhu.png" alt="Logo" className="footer-logo" />
          <p className="footer-text">rajyalaxmiraji124@gmail.com</p>
          <p className="footer-text">+919133290263</p>
        </div>
        <div className="footer-column">
          <ul className="footer-links">
            <li><a href="#">HOME</a></li>
            <li><a href="#">Nirvana</a></li>
            <li><a href="#">States</a></li>
            <li><a href="#">Feed</a></li>
            <li><a href="#">Account</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p> @Copyright 2019 Vindhu welcome to Nirvana</p>
      </div>
    </footer>
  );
};

export default Footer;
