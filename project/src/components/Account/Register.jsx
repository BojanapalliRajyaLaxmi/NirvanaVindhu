import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./resgister.css"; 
import Footer from '../footer/Footer'
import Carousel from './Slide'
const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!", { position: "top-center" });
            return;
        }
        try {
            await axios.post("http://localhost:3002/register", formData);
            toast.success("Registration successful!", { position: "top-center" });
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Error registering user:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "Registration failed!", { position: "top-center" });
            } else {
                toast.error("Server error! Please try again later.", { position: "top-center" });
            }
        }
    };
    return (
        <>
        <div id='hello'>
        <div className="wrapper">
            <ToastContainer />
            <img src="/public/logoVindhu.png" className="image" alt="Logo" />
            <div className="inner">
                <form onSubmit={handleSubmit}>
                    <h3>Registration Form</h3>

                    <div className="form-wrapper">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" className="form-control" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className="form-wrapper">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>

                    <div className="checkbox">
                        <label>
                            <input type="checkbox" required /> I accept the Terms of Use & Privacy Policy.
                        </label>
                    </div>

                    <button id="btn" type="submit">Register Now</button>
                </form>
            </div>
        </div>
            <Carousel/>
        </div>
        <Footer/>
        </>
    );
};

export default Register;
