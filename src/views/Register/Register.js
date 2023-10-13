import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserDataService from '../../services/user';

import './register.css';

export const Register = () => {

    const navigate = useNavigate();

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
                navigate("/login")
                console.log("user registered successfully", response.data);
            })
            .catch((error) => {
                console.error("error while registering the user", error)
            });
    };


    return (
        <div className="register container row col-12">
            <div className="col-md-6">
                <img src={require("../../assets/images/undraw_order_delivered_re_v4ab.svg").default} alt="register" />
            </div>
            <div className="form-container col-md-6 mt-5">
                <h1 className="title">Welcome here!</h1>
                <p className="subtitle">Please enter your details</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-input"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-input"
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-input"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="register-btn">Register</button>
                </form>
                <p className="login-text">Already have an account? <Link className="login-link" to="/login"> Sign In</Link></p>
            </div>
        </div>
    );
};
