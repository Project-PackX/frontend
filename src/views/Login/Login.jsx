import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserDataService from "../../services/user";
import { useAuth } from "../../context/auth";
import ReCaptchaWidget from "../../components/reCAPTCHA/reCAPTCHA";
import jwtDecode from "jwt-decode";
import "./login.css";
import { AlreadyLoggedIn } from "../../components/Slave/AlreadyLoggedIn/AlreadyLoggedIn";

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const onRecaptchaChange = (isVerified) => setIsRecaptchaVerified(isVerified);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isRecaptchaVerified) {
      setError("Please verify that you're a human.");
      return;
    }

    const requestData = { Email: formData.email, Password: formData.password };

    UserDataService.login(requestData)
      .then((response) => {
        const { token, user } = response.data;
        console.log("Server response", response.data);
        localStorage.setItem("token", token);
        localStorage.setItem("name", user.Name);
        localStorage.setItem("email", user.Email);
        localStorage.setItem("address", user.Address);
        localStorage.setItem("phone", user.Phone);
        localStorage.setItem("user_id", jwtDecode(token).user_id);
        localStorage.setItem("login_date", new Date().toISOString());
        login();
        console.log("user logged in successfully", token);
        navigate("/");
      })
      .catch(() => setError("Error while logging in. Please check your email and password."));
  };

  if (isLoggedIn) {
    return <AlreadyLoggedIn />;
  }

  return (
    <div className="login container row col-12">
      <div className="login-form-container col-md-6 mt-5">
        <h1 className="title">Welcome back!</h1>
        <p className="login-subtitle">Please enter your details</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="login-form-label">
              Email
            </label>
            <input type="text" className="login-form-input" id="email" required value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="login-form-label">
              Password
            </label>
            <input
              type="password"
              className="login-form-input"
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
        <img src="/assets/images/undraw_delivery_truck_vt6p.svg" alt="login" />
      </div>
    </div>
  );
};
