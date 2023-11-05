import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../../services/user';
import ReCaptchaWidget from '../../components/reCAPTCHA/reCAPTCHA';
import './codeauth.css';

export const CodeAuth = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', code: '' });
    const [error, setError] = useState('');
    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    const handleSendCode = (e) => {
        e.preventDefault();
        if (!isRecaptchaVerified) return setError("Please verify that you're a human.");
        
        UserDataService.sendPasswordResetCode(formData.email)
            .then((response) => {
                if (response.data === "OK") {
                    setError(
                        <div className="alert alert-success">
                            The reset code has been sent to your email.
                        </div>
                    );
                } else {
                    setError(
                        <div className="alert alert-danger">
                            Failed to send the reset code. Please try again.
                        </div>
                    );
                }
            })
            .catch(() => setError(<div className="alert alert-danger">Failed to send the reset code. Please try again.</div>));
    };   
    
    const handleAuthCode = (e) => {
        e.preventDefault();
        const requestData = { code: formData.code };
    
        UserDataService.checkPasswordResetCode(requestData.code) 
            .then((response) => {
                if (response.status === 200) navigate('/resetpasswd', { state: { referrer: 'codeauth' } });
                else setError(<div className="alert alert-danger">The authentication code you provided appears to be incorrect or has already expired/been used. Please try again.</div>);
            });
    };
    
    return (
        <div className="codeauth container row col-12">
            <div className="form-container col-md-6 mt-5">
                <h1 className="codeauth-title">Password reset code authentication</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSendCode}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-input" id="email" required value={formData.email} onChange={handleInputChange} />
                    </div>
                    <ReCaptchaWidget onRecaptchaChange={(isVerified) => setIsRecaptchaVerified(isVerified)} />
                    <button type="submit" className="codeauth-btn">Send</button>
                </form>
                <form onSubmit={handleAuthCode}>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Enter code</label>
                        <input type="text" className="form-input" id="code" required value={formData.code} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="codeauth-btn">Check</button>
                </form>
            </div>
            <div className="col-md-6">
                <img className="image" src={require("../../assets/images/undraw_two_factor_authentication_namy.svg").default} alt="codeauth" />
            </div>
        </div>
    );
};
