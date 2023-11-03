import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth';
import UserDataService from '../../services/user';
import decode from 'jwt-decode';
import ReCaptchaWidget from '../../components/reCAPTCHA/reCAPTCHA';
import './userdata.css';

export const UserData = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    });
    const [error, setError] = useState('');

    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
    const onRecaptchaChange = (isVerified) => {
        setIsRecaptchaVerified(isVerified);
    };

    useEffect(() => {
        if (isLoggedIn) {
          setFormData({
            name: localStorage.getItem('name'),
            address: localStorage.getItem('address'),
            phone: localStorage.getItem('phone'),
            email: localStorage.getItem('email'),
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
    
        if (!isRecaptchaVerified) {
          setError("Please verify that you're a human.");
          return;
        }
    
        // Create a JSON object to send to the server with updated data
        const updatedUserData = {
          Name: formData.name,
          Address: formData.address,
          Phone: formData.phone,
          Email: formData.email,
        };
    
        // Send the updated data to the server
        UserDataService.updateUser(decode(localStorage.getItem('token')).user_id,
        localStorage.getItem('token'), updatedUserData)
          .then((response) => {
            console.log('User data updated successfully', response.data);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('address', response.data.address);
            localStorage.setItem('phone', response.data.phone);
            localStorage.setItem('email', response.data.email);
          })
          .catch((error) => {
            setError('Error updating user data. Please try again.');
            console.error('Update user data error:', error);
          });
      };

    if (!isLoggedIn) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="text-center">
                        <h1>Please log in to access this feature.</h1>
                        <img className="error-image" src={require("../../assets/images/undraw_access_denied_re_awnf.svg").default} alt="user-data" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="userdata container row col-12">
            <div className="form-container col-md-6 mt-5">
                <h1 className="userdata-title">Edit Your User Data</h1>
                <p className="delete-subtitle">Here you can modify your account informations.</p>
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

                    <div>
                    <ReCaptchaWidget onRecaptchaChange={onRecaptchaChange} />
                    </div>

                    <button type="submit" className="userdata-btn">
                        Save
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <img className="image" src={require("../../assets/images/undraw_private_data_re_4eab.svg").default} alt="user-data" />
            </div>
        </div>
    );
};
