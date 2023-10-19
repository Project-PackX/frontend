import React from 'react';
import { Link } from 'react-router-dom';

import './successful-send.css';

export const SuccessfulSend = () => {
    return (
        <div className="container send-container">
            <div className="send-box">
                <h2>Thank you for using PackX!</h2>
                <p>We will send you the important informations about your package via email.</p>
                <Link to="/" className="btn login-btn">Back to home</Link>
            </div>
        </div>
    );
};