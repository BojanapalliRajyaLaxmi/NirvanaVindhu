
import React, { useState, useEffect } from "react";
import { FaHeart, FaSun, FaMoon, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import "./Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [tokenLogin, setTokenLogin] = useState(localStorage.getItem("tokenlogin"));
  const [username, setUsername] = useState(localStorage.getItem("userName") || "Guest");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("tokenlogin");
    const user = localStorage.getItem("userName");
    setTokenLogin(token);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSigninClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("tokenlogin");
    localStorage.removeItem("userName");
    setTokenLogin(null);
    setUsername("Guest");
    navigate("/");
  };

  const menuItems = [
    { key: "1", label: "My Account", disabled: true, className: "ant-dropdown-menu-item-disabled" },
    { key: "2", label: <Link to="/profile"><SettingOutlined /> Settings</Link> },
    { key: "3", label: <Link to="/cart"><FaShoppingCart /> Cart</Link> },
    { key: "4", label: <Link to="/wishlist"><FaHeart /> Wishlist</Link> },
    { type: "divider", className: "ant-dropdown-menu-item-divider" },
    tokenLogin
      ? { key: "5", label: <span onClick={handleLogoutClick}>Log Out</span> }
      : [
          { key: "5", label: <span onClick={handleLoginClick}>Log In</span> },
          { key: "6", label: <span onClick={handleSigninClick}>Sign Up</span> },
        ],
  ].flat(); 

  return (
    <nav id="nav" className={`navbar ${darkMode ? "dark" : "light"}`}>
      <img src="/public/logoVindhu.png" alt="Logo" width={100} height={100} />
      <ul className="nav-links">
        <div className="nav-links-center">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/restaurant" ? "active" : ""}>
            <Link to="/restaurant">Nirvana</Link>
          </li>
          <li className={location.pathname === "/states" ? "active" : ""}>
            <Link to="/states">States</Link>
          </li>
          <li className={location.pathname === "/feed" ? "active" : ""}>
            <Link to="/feed">Feed</Link>
          </li>
          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">Profile</Link>
          </li>
        </div>
        <div className="nav-links-right">
          <li className="account-icon">
          <span className="username">{username}</span>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <FaUserCircle size={20} /> <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
