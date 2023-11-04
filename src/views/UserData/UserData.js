import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import UserDataService from '../../services/user';
import decode from 'jwt-decode';
import ReCaptchaWidget from '../../components/reCAPTCHA/reCAPTCHA';
import { NoPermission } from '../../components/Slave/NoPermission/NoPermission';
import './userdata.css';

export const UserData = () => {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

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
    const updatedUserData = {
      Name: formData.name,
      Address: formData.address,
      Phone: formData.phone,
      Email: formData.email,
    };
    const token = localStorage.getItem('token');
    const userId = decode(token).user_id;

    UserDataService.updateUser(userId, token, updatedUserData)
      .then((response) => {
        console.log('User data updated successfully', response.data);
        ['name', 'address', 'phone', 'email'].forEach((field) => {
          localStorage.setItem(field, response.data[field]);
        });
      })
      .catch((error) => {
        setError('Error updating user data. Please try again.');
        console.error('Update user data error:', error);
      });
  };

  if (!isLoggedIn) {
    return <NoPermission />;
  }

  return (
    <div className="userdata container row col-12">
      <div className="userdata-form-container col-md-6 mt-5">
        <h1 className="userdata-title">Edit Your User Data</h1>
        <p className="delete-subtitle">Here you can modify your account information.</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {['name', 'address', 'phone'].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="userdata-form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                className="userdata-form-input"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <ReCaptchaWidget onRecaptchaChange={setIsRecaptchaVerified} />
          <button type="submit" className="userdata-btn">
            Save
          </button>
        </form>
      </div>
      <div className="col-md-6">
      <img className="image" src={require("../../assets/images/undraw_private_data_re_4eab.svg").default} alt="user-data" />      </div>
    </div>
  );
};