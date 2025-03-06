import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Data.css";

const Data = () => {
    const [user, setUser] = useState({ name: "", email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details from localStorage
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");

        if (storedName && storedEmail) {
            setUser({ name: storedName, email: storedEmail });
        } else {
            // Redirect to login if no user data found
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="profile-container">
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <button onClick={() => {
                localStorage.clear();
                navigate("/login");
            }}>Logout</button>
        </div>
    );
};

export default Data;
