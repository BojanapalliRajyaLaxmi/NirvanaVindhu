import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import Footer from '../footer/Footer'

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post("https://backend-2-h6m8.onrender.com/login", formData);
            toast.success("Login successful!", { position: "top-center" });
    
            localStorage.setItem("tokenlogin", response.data.token);
    
            if (response.data.user) {
                localStorage.setItem("userEmail", response.data.user.email);
                localStorage.setItem("userName", response.data.user.name); // ✅ Store username correctly
            } else {
                toast.error("User data not found!", { position: "top-center" });
                return;
            }
    
            setTimeout(() => navigate("/feed"), 1000);
        } catch (error) {
            toast.error("Login failed! Check credentials.", { position: "top-center" });
        }
    };
    

    return (
        <>
        <div>
        <div className="login-container">
            <ToastContainer />
            <img src="/public/logoVindhu.png" alt="Logo" />
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required /><br />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required /><br />

                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
        <Footer/>
            </div>
            </>
    );
};

export default Login;
