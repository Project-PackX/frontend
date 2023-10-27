import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserDataService from '../../services/user';
import { useAuth } from '../../context/auth';
import ReCaptchaWidget from '../../components/reCAPTCHA/reCAPTCHA';
import './resetpasswd.css';

export const ResetPasswd = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
    const onRecaptchaChange = (isVerified) => {
        setIsRecaptchaVerified(isVerified);
    };
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(''); // Error state to display error message if resetpasswd fails

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
            // Passwords match, you can proceed with form submission or other actions.
            setPasswordsMatch(true);

            // Add your form submission logic here.
        } else {
            // Passwords do not match.
            setPasswordsMatch(false);
        }

        // Create a JSON object to send to the server
        const requestData = {
            //Email: formData.email,
            //Password: formData.password,
        };

        UserDataService.resetpasswd(requestData)
            .then((response) => {
                //To be implemented
            })
            .catch((error) => {
                setError("Please check your email and your new password again.");
            });
    };

    const handleRecaptchaChange = (value) => {
        setIsRecaptchaVerified(!!value);
    };
    
    if (!isLoggedIn) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="text-center">
                        <h1>Please log in to access this feature.</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="resetpasswd container row col-12">
            <div className="form-container col-md-6 mt-5">
                <h1 className="resetpasswd-title">Please enter your new login credentials</h1>
                <p className="resetpasswd-subtitle">Make sure to always use a different password for security reasons.</p>
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
                            New password
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            id="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm new password
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

                    <div>
                    <ReCaptchaWidget onRecaptchaChange={onRecaptchaChange} />
                    </div>

                    <button type="submit" className="resetpasswd-btn">
                        Save
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <img className="image" src={require("../../assets/images/undraw_secure_login_pdn4.svg").default} alt="resetpasswd" />
            </div>
        </div>
    );
};
