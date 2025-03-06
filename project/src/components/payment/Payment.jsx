import { useState, useEffect } from "react";
import { FaGooglePay, FaCreditCard, FaWallet, FaMoneyBillWave, FaUniversity } from "react-icons/fa";
import { SiPhonepe, SiPaytm } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import "./payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | processing | success

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => console.log("Razorpay script loaded.");
      script.onerror = () => console.error("Failed to load Razorpay.");
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const paymentMethods = [
    { id: "gpay", name: "Google Pay", icon: <FaGooglePay className="icon" /> },
    { id: "paytm", name: "Paytm UPI", icon: <SiPaytm className="icon" /> },
    { id: "phonepe", name: "PhonePe", icon: <SiPhonepe className="icon" /> },
    { id: "wallet", name: "Wallet", icon: <FaWallet className="icon" /> },
    { id: "card", name: "Debit/Credit Card", icon: <FaCreditCard className="icon" /> },
    { id: "netbanking", name: "Net Banking", icon: <FaUniversity className="icon" /> },
    { id: "cod", name: "Cash on Delivery", icon: <FaMoneyBillWave className="icon" /> },
  ];

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    setPaymentStatus("processing");

    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay API Key
      amount: 50000, // Amount in paise (₹500)
      currency: "INR",
      name: "Your Business Name",
      description: "Payment for Order #12345",
      image: "https://yourwebsite.com/logo.png", // Optional
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        setPaymentStatus("success");
      },
      prefill: {
        name: "B.Rajyalxmi",
        email: "rajyalakshmiraji124@gmail.com",
        contact: "9133290263",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleClose = () => {
    if (paymentStatus === "success") {
      navigate("/states");
    } else {
      setPaymentStatus("idle");
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Select Payment Method</h2>

        <div className="payment-options">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`payment-method ${selectedMethod === method.id ? "selected" : ""}`}
              onClick={() => setSelectedMethod(method.id)}
              disabled={paymentStatus === "processing"}
            >
              <span className="method-info">{method.icon} {method.name}</span>
              {selectedMethod === method.id && <span className="checkmark">✔</span>}
            </button>
          ))}
        </div>

        {selectedMethod && paymentStatus === "idle" && (
          <button className="pay-button" onClick={handlePayment}>
            Proceed to Payment
          </button>
        )}
      </div>

      {paymentStatus !== "idle" && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <h2>{paymentStatus === "success" ? "Payment Successful!" : "Processing Payment..."}</h2>

            {paymentStatus === "processing" ? (
              <div className="spinner"></div>
            ) : (
              <div className="success-message">✅ Order Successfully Placed!</div>
            )}

            <button className="close-modal" onClick={handleClose}>
              {paymentStatus === "success" ? "Go to States" : "Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
