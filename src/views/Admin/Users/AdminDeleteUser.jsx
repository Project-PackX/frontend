import React, { useState } from "react";
import { useAuth } from "../../../context/auth";
import UserDataService from "../../../services/user";
import ReCaptchaWidget from "../../../components/reCAPTCHA/reCAPTCHA";
import { NoPermission } from "../../../components/Slave/NoPermission/NoPermission";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const AdminDeleteUser = () => {
  const { isLoggedIn, logout } = useAuth();
  const access_level = parseInt(localStorage.getItem("access_level"));
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onRecaptchaChange = (isVerified) => {
    setIsRecaptchaVerified(isVerified);
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();

    if (!isRecaptchaVerified) {
      setError("Please verify that you're a human.");
      return;
    }
    else {
    UserDataService.deleteUser(formData.name, localStorage.getItem("token"))
    .then(() => {
         navigate("/successfulresponse", { state: { referrer: "admin-delete-user" } });
       })
       .catch((error) => {
         setError("An error occurred while deleting the user.");
      });
    }
  };

  if (access_level === 1 || access_level === 2) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="text-center">
            <h1>You do not have permission to view this page.</h1>
            <img className="error-image" src="/assets/images/undraw_access_denied_re_awnf.svg" alt="user-data" />
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
        <h1 className="delete-title">Delete accounts</h1>
        <p className="delete-subtitle">Please note that this process cannot be undone.</p>
        {error && <div className="error-message">{error}</div>}
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              User ID
            </label>
            <input
              type="text"
              className="form-input"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 register-form-check">
            <input type="checkbox" className="register-form-check-input" id="acceptTerms" required />
            <label className="register-form-check-label" htmlFor="acceptTerms">
              I have read that this process is not reversible and permanent.
            </label>
          </div>
          <div>
            <ReCaptchaWidget onRecaptchaChange={onRecaptchaChange} />
          </div>
          <button type="button" onClick={handleDeleteUser} className="delete-btn">
            Delete
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <img className="image" src="/assets/images/undraw_throw_away_re_x60k.svg" alt="user-data" />
      </div>
    </div>
  );
};
