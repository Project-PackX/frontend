import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import UserDataService from "../../services/user";
import { useAuth } from "../../context/auth";
import ReCaptchaWidget from "../../components/reCAPTCHA/reCAPTCHA";
import "./resetpasswd.css";
import { NoPermission } from "../../components/Slave/NoPermission/NoPermission";

export const ResetPasswd = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const onRecaptchaChange = (isVerified) => {
    setIsRecaptchaVerified(isVerified);
    if (isVerified) {
      setError("");
    }
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isRecaptchaVerified) {
      setError("Please verify that you're a human.");
      return;
    }

    if (formData.password === formData.confirmPassword) {
      setPasswordsMatch(true);
      setError(""); // Clear the error message when the passwords match
      const requestData = {
        email: formData.email,
        password: formData.password,
        password_again: formData.confirmPassword,
      };
      UserDataService.resetPassword(requestData)
        .then((response) => {
          if (response.status === 200) {
            // Password reset was successful
            // You can navigate to another page or show a success message here
          } else {
            setError("Please check your email and your new password again.");
          }
        })
        .catch((error) => {
          setError("An error occurred while resetting your password. Please try again.");
        });
    } else {
      setPasswordsMatch(false);
    }
  };

  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const timers = useRef({ password: null, confirmPassword: null });

  const handleShowPassword = (field) => {
    const newShowPassword = { ...showPassword };
    newShowPassword[field] = true;
    setShowPassword(newShowPassword);

    if (timers.current[field]) {
      clearTimeout(timers.current[field]);
    }

    timers.current[field] = setTimeout(() => {
      const newShowPassword = { ...showPassword };
      newShowPassword[field] = false;
      setShowPassword(newShowPassword);
    }, 300);
  };

  if (!isLoggedIn && location.state?.referrer !== "codeauth") {
    return <NoPermission />;
  }

  return (
    <div className="resetpasswd container row col-12">
      <div className="form-container col-md-6 mt-5">
        <h1 className="resetpasswd-title">Please enter your new login credentials</h1>
        <p className="resetpasswd-subtitle">Make sure to always use a different password for security reasons.</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-input"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword.password ? "text" : "password"}
                className="form-input"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <button type="button" onClick={() => handleShowPassword("password")} className="show-password-button">
                <img className="showpass-image" src={"../../assets/icons/showpass.png"} alt="showpass" />
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm new password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                className="form-input"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <button type="button" onClick={() => handleShowPassword("confirmPassword")} className="show-password-button">
                <img className="showpass-image" src={"../../assets/icons/showpass.png"} alt="showpass" />
              </button>
            </div>
          </div>

          {passwordsMatch === false && <div className="alert alert-danger">Passwords do not match.</div>}

          <div>
            <ReCaptchaWidget onRecaptchaChange={onRecaptchaChange} />
          </div>

          <button type="submit" className="resetpasswd-btn">
            Save
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <img className="image" src={"../../assets/images/undraw_secure_login_pdn4.svg".default} alt="resetpasswd" />
      </div>
    </div>
  );
};
