import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import UserDataService from "../../services/user";
import { useAuth } from "../../context/auth";
import ReCaptchaWidget from "../../components/reCAPTCHA/reCAPTCHA";
import "./resetpasswd.css";
import { useNavigate } from "react-router-dom";
import { NoPermission } from "../../components/Slave/NoPermission/NoPermission";

export const ResetPasswd = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const timers = useRef({ password: null, confirmPassword: null });

  const navigate = useNavigate();

  const onRecaptchaChange = (isVerified) => {
    setIsRecaptchaVerified(isVerified);
    if (isVerified) setError("");
  };

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

    if (formData.password === formData.confirmPassword) {
      setPasswordsMatch(true);

      const requestData = {
        password: formData.password,
        passwordAgain: formData.confirmPassword,
      };

      UserDataService.resetPassword(formData.email, requestData)
        .then((response) => {
          if (response.status === 200) {
            logout();
            navigate("/successfulresponse", { state: { referrer: "resetpasswd" } });
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

  const handleShowPassword = (field) => {
    const newShowPassword = { ...showPassword, [field]: true };
    setShowPassword(newShowPassword);

    if (timers.current[field]) {
      clearTimeout(timers.current[field]);
    }

    timers.current[field] = setTimeout(() => {
      const newShowPassword = { ...showPassword, [field]: false };
      setShowPassword(newShowPassword);
    }, 300);
  };

  if (!isLoggedIn && location.state?.referrer !== "codeauth") {
    return <NoPermission />;
  }

  return (
    <div className="resetpasswd container row col-12">
      <div className="resetpasswd-form-container col-md-6 mt-5">
        <h1 className="resetpasswd-title">Please enter your new login credentials</h1>
        <p className="resetpasswd-subtitle">Make sure to always use a different password for security reasons.</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="resetpasswd-form-label">
              Email
            </label>
            <input
              type="text"
              className="resetpasswd-form-input"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {["password", "confirmPassword"].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="resetpasswd-form-label">
                {field === "password" ? "New password" : "Confirm new password"}
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword[field] ? "text" : "password"}
                  className="resetpasswd-form-input"
                  id={field}
                  name={field}
                  required
                  value={formData[field]}
                  onChange={handleInputChange}
                />
                <button type="button" onClick={() => handleShowPassword(field)} className="show-password-button">
                  <img className="showpass-image" src="/assets/icons/showpass.png" alt="showpass" />
                </button>
              </div>
            </div>
          ))}
          {passwordsMatch === false && <div className="alert alert-danger">Passwords do not match.</div>}
          <ReCaptchaWidget onRecaptchaChange={onRecaptchaChange} />
          <button type="submit" className="resetpasswd-btn">
            Save
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <img className="image" src="/assets/images/undraw_secure_login_pdn4.svg" alt="resetpasswd" />
      </div>
    </div>
  );
};
