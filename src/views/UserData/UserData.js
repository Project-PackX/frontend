import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth';
import decode from 'jwt-decode';
import ReCAPTCHA from "react-google-recaptcha";
import SITE_KEY from '../../components/reCAPTCHA/reCAPTCHA';
import './userdata.css';

export const UserData = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isLoggedIn) {

                    setFormData({
                        name: localStorage.getItem("name"),
                        address: localStorage.getItem("address"),
                        phone: localStorage.getItem("phone"),                        
                        email: localStorage.getItem("email"),
                        password: localStorage.getItem("password")
                    });

        }
    }, [isLoggedIn]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a JSON object to send to the server with updated data
        const updatedUserData = {
            Name: formData.name,
            Address: formData.address,
            Phone: formData.phone,
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

    return (
        <div className="userdata container row col-12">
            <div className="form-container col-md-6 mt-5">
                <h1 className="userdata-title">Edit Your User Data</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            name="phone"
                            value={formData.phone}
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

                    <button type="submit" className="userdata-btn">
                        Save
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <img src={require("../../assets/images/undraw_private_data_re_4eab.svg").default} alt="user-data" />
            </div>
        </div>
    );
};
