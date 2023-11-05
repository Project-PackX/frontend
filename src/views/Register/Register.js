import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserDataService from '../../services/user';
import ReCaptchaWidget from '../../components/reCAPTCHA/reCAPTCHA';
import './register.css';

export const Register = () => {
  const navigate = useNavigate();
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  const onRecaptchaChange = (isVerified) => setIsRecaptchaVerified(isVerified);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!isRecaptchaVerified) {
      alert("Please verify that you're a human.");
      return;
    }
  
    const requestData = {
      Name: formData.name,
      Address: formData.address,
      Phone: formData.phone,
      Email: formData.email,
      Password: formData.password,
    };
  
    UserDataService.register(requestData)
      .then((response) => {
        // Redirect to the homepage ("/") after successful registration
        console.log('User registered successfully', response.data);
        navigate('/successfulresponse', { state: { referrer: '/register' } });
      })
      .catch((error) => {
        console.error('Error while registering the user', error);
      });
  };
  

  return (
    <div className="register container row col-12">
      <div className="col-md-6">
        <img
          src={require('../../assets/images/undraw_order_delivered_re_v4ab.svg').default}
          alt="register"
        />
      </div>
      <div className="register-form-container col-md-6 mt-5">
        <h1 className="register-title">Welcome here!</h1>
        <p className="register-subtitle">Please enter your details</p>
        <form onSubmit={handleSubmit}>
          {[
            { id: 'name', label: 'Name', type: 'text' },
            { id: 'address', label: 'Address', type: 'text' },
            { id: 'phone', label: 'Phone', type: 'text' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'password', label: 'Password', type: 'password' },
          ].map((input) => (
            <div key={input.id} className="mb-3">
              <label htmlFor={input.id} className="register-form-label">
                {input.label}
              </label>
              <input
                type={input.type}
                className="register-form-input"
                id={input.id}
                value={formData[input.id]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          <div className="mb-3 register-form-check">
            <input type="checkbox" className="register-form-check-input" id="acceptTerms" required />
            <label className="register-form-check-label" htmlFor="acceptTerms">
              I have read and agreed to the <a href="/policy" target="_blank">terms and conditions</a>.
            </label>
          </div>
          <div>
            <ReCaptchaWidget onRecaptchaChange={onRecaptchaChange} />
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        <p className="register-text">
          Already have an account? <Link className="register-link" to="/login"> Sign In</Link>
        </p>
      </div>
    </div>
  );
};