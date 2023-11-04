import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserDataService from '../../services/user';
import ReCaptchaWidget from '../../components/reCAPTCHA/reCAPTCHA';
import './register.css';

export const Register = () => {

    const navigate = useNavigate();
    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
    
    const onRecaptchaChange = (isVerified) => {
        setIsRecaptchaVerified(isVerified);
    };

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
    });

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
            alert("Please verify that you're a human.");
            return;
        }

        // Create a JSON object to send to the server
        const requestData = {
            Name: formData.name,
            Address: formData.address,
            Phone: formData.phone,
            Email: formData.email,
            Password: formData.password,
        };

        // Call the register method from UserDataService to send the data to the server
        UserDataService.register(requestData)
            .then((response) => {
                navigate("/register")
                console.log("user registered successfully", response.data);
            })
            .catch((error) => {
                console.error("error while registering the user", error)
            });
    };

    const handleRecaptchaChange = (value) => {
        setIsRecaptchaVerified(!!value);
    };

    return (
        <div className="register container row col-12">
            <div className="col-md-6">
                <img src={require("../../assets/images/undraw_order_delivered_re_v4ab.svg").default} alt="register" />
            </div>
            <div className="register-form-container col-md-6 mt-5">
                <h1 className="register-title">Welcome here!</h1>
                <p className="register-subtitle">Please enter your details</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="register-form-label">Name</label>
                        <input
                            type="text"
                            className="register-form-input"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="register-form-label">Address</label>
                        <input
                            type="text"
                            className="register-form-input"
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="register-form-label">Phone</label>
                        <input
                            type="text"
                            className="register-form-input"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="register-form-label">Email</label>
                        <input
                            type="email"
                            className="register-form-input"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="register-form-label">Password</label>
                        <input
                            type="password"
                            className="register-form-input"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 register-form-check">
                        <input
                            type="checkbox"
                            className="register-form-check-input"
                            id="acceptTerms"
                            required
                        />
                        <label className="register-form-check-label" htmlFor="acceptTerms">
                        I have read and agreed to the <a href="/policy" target="_blank">terms and conditions</a>.
                        </label>

                    </div>

                    <div>
                    <ReCaptchaWidget onRecaptchaChange={onRecaptchaChange} />
                    </div>

                    <button type="submit" className="register-btn">Register</button>
                </form>
                <p className="register-text">Already have an account? <Link className="register-link" to="/register"> Sign In</Link></p>
            </div>
        </div>
    );
};
