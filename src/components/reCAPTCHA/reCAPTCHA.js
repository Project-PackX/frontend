import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
/*https://www.google.com/recaptcha/admin/site/685076369/setup */

const SITE_KEY = '6LeRb9UoAAAAACmmOaad7MErLIZd_-P3iLK8k1f2';

const ReCaptchaWidget = ({ onRecaptchaChange }) => {
    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

    const handleRecaptchaChange = (value) => {
        setIsRecaptchaVerified(!!value);
        onRecaptchaChange(!!value);
    };

    return (
        <div>
            <ReCAPTCHA sitekey={SITE_KEY} onChange={handleRecaptchaChange} />
        </div>
    );
};

export default ReCaptchaWidget;
