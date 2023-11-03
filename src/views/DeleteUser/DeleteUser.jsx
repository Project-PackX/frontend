import React, { useState, useRef } from "react";
import { useAuth } from "../../context/auth";
import ReCaptchaWidget from "../../components/reCAPTCHA/reCAPTCHA";
import "./deleteuser.css";
import { NoPermission } from "../../components/Slave/NoPermission/NoPermission";

export const DeleteUser = () => {
  const { isLoggedIn } = useAuth();
  const access_level = parseInt(localStorage.getItem("access_level"));
  console.log(access_level);

  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const onRecaptchaChange = (isVerified) => {
    setIsRecaptchaVerified(isVerified);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      // Passwords match, you can proceed with form submission or other actions.
      setPasswordsMatch(true);

      // Add your form submission logic here.
    } else {
      // Passwords do not match.
      setPasswordsMatch(false);
    }

    // Create a JSON object to send to the server with updated data
    const UserData = {
      Email: formData.email,
      Password: formData.password,
    };
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

  if (access_level === 2) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="text-center">
            <h1>You do not have permission to view this page.</h1>
            <img className="error-image" src={"../../assets/images/undraw_access_denied_re_awnf.svg".default} alt="user-data" />
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <NoPermission />;
  }

  return (
    <div className="delete container row col-12">
      <div className="form-container col-md-6 mt-5">
        <h1 className="delete-title">Delete your account</h1>
        <p className="delete-subtitle">Please note that this process cannot be undone.</p>
        {error && <div className="error-message">{error}</div>}
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
              Password
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
              Confirm password
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

          <button type="submit" className="delete-btn">
            Delete
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <img className="image" src={"../../assets/images/undraw_throw_away_re_x60k.svg".default} alt="user-data" />
      </div>
    </div>
  );
};
