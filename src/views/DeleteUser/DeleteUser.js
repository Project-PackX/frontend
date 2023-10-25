import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth';
import decode from 'jwt-decode';
import ReCAPTCHA from "react-google-recaptcha";
import SITE_KEY from '../../components/reCAPTCHA/reCAPTCHA';
import './deleteuser.css';

export const DeleteUser = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

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

        {/*
        if (isRecaptchaVerified) {
            // You can proceed with your form submission logic here
          } else {
            alert("Please complete the reCAPTCHA verification.");
          }
        */}

        if (formData.password === formData.confirmPassword) {
            // Passwords match, you can proceed with form submission or other actions.
            setPasswordsMatch(true);

            // Add your form submission logic here.
        } else {
            // Passwords do not match.
            setPasswordsMatch(false);
        }

        // Create a JSON object to send to the server with updated data
        const updatedUserData = {
            Email: formData.email,
            Password: formData.password,
        };
    };

    if (!isLoggedIn) {
        return (
            <div className="container">
                <p>Please log in to access this feature.</p>
            </div>
        );
    }

    const handleRecaptchaChange = (value) => {
        setIsRecaptchaVerified(!!value);
    };

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
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm password
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>

                    {passwordsMatch === false && (
                        <div className="alert alert-danger">Passwords do not match.</div>
                    )}

                    <button type="submit" className="delete-btn">
                        Delete
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <img src={require("../../assets/images/undraw_private_data_re_4eab.svg").default} alt="user-data" />
            </div>
        </div>
    );
};
