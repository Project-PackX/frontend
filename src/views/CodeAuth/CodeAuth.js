import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../../services/user';
import ReCaptchaWidget from '../../components/reCAPTCHA/reCAPTCHA';
import './codeauth.css';

export const CodeAuth = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        code: '',
    });
    const [error, setError] = useState(''); 

    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
    const onRecaptchaChange = (isVerified) => {
        setIsRecaptchaVerified(isVerified);
    };

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
            setError("Please verify that you're a human.");
            return;
        }

        const requestData = {
            email: formData.email,
        };
        
    };

    const handleAuthCode = (e) => {
        e.preventDefault();

        const requestData = {
            code: formData.code,
        };

        UserDataService.checkResetCode(requestData)
            .then((response) => {
                if (response.status === 200) {
                    navigate('/resetpasswd');
                } else {
                    setError(<div className="alert alert-danger">The auth code you provided appears to be incorrect, or have already expired/been used. Please try again!</div>);
                }
            })
    };

    return (
        <div className="codeauth container row col-12">
            <div className="form-container col-md-6 mt-5">
                <h1 className="codeauth-title">Password reset code authentication</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label htmlFor="username" className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-input"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                    <ReCaptchaWidget onRecaptchaChange={onRecaptchaChange} />
                    </div>

                    <button type="submit" className="codeauth-btn">
                        Send
                    </button>
                </form>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">
                            Enter code
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            id="code"
                            name="code"
                            required
                            value={formData.code}
                            onChange={handleAuthCode}
                        />
                    </div>

                    <button type="submit" className="codeauth-btn">
                        Check
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <img className="image" src={require("../../assets/images/undraw_two_factor_authentication_namy.svg").default} alt="codeauth" />
            </div>
        </div>
    );
};
