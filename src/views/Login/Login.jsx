import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserDataService from "../../services/user";
import { useAuth } from "../../context/auth";
import ReCaptchaWidget from "../../components/reCAPTCHA/reCAPTCHA";
import "./login.css";
import { AlreadyLoggedIn } from "../../components/Slave/AlreadyLoggedIn/AlreadyLoggedIn";

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const onRecaptchaChange = (isVerified) => {
    setIsRecaptchaVerified(isVerified);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Error state to display error message if login fails

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isRecaptchaVerified) {
      setError("Please verify that you're a human.");
      return;
    }

    // Create a JSON object to send to the server
    const requestData = {
      Email: formData.email,
      Password: formData.password,
    };

    // Call the login method from UserDataService to send the data to the server
    UserDataService.login(requestData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("address", response.data.address);
        localStorage.setItem("phone", response.data.phone);
        login(); // Call the login function from the authentication context
        navigate("/");
        console.log("user logged in successfully", response.data.token);
      })
      .catch((error) => {
        setError("Error while logging in. Please check your email and password.");
      });
  };

  if (isLoggedIn) {
    return <AlreadyLoggedIn />;
  }

  return (
    <div className="login container row col-12">
      <div className="form-container col-md-6 mt-5">
        <h1 className="title">Welcome back!</h1>
        <p className="subtitle">Please enter your details</p>
        {error && <div className="error-message">{error}</div>} {/* Display error message if error state is set */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input type="text" className="form-input" id="email" required value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-input"
              id="password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <ReCaptchaWidget onRecaptchaChange={onRecaptchaChange} />
          </div>

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
        <p className="register-text">
          Don't have an account?
          <Link className="register-link" to="/register">
            {" "}
            Sign Up
          </Link>
        </p>
        <p className="reset-text">
          Forgot your password?{" "}
          <Link className="register-link" to="/codeauth">
            {" "}
            Reset password
          </Link>
        </p>
      </div>
      <div className="col-md-6">
        <img src={"../../assets/images/undraw_delivery_truck_vt6p.svg".default} alt="login" />
      </div>
    </div>
  );
};
