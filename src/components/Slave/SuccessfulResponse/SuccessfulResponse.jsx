import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './successfulresponse.css';

export const SuccessfulResponse = () => {
    const location = useLocation();

    let message = '';
    let linkTo = '';
    let actionText = '';

    if (location.state?.referrer === 'dispatch') {
        message = 'Your package information will be sent to your email.';
        linkTo = '/';
        actionText = 'Home';
    } else if (location.state?.referrer === 'register') {
        message = 'Your registration was successful.';
        linkTo = '/login';
        actionText = 'Login';
    } else if (location.state?.referrer === 'deleteuser') {
        message = 'Your user account has been permanently deleted! Hope to see you soon.';
        linkTo = '/';
        actionText = 'Home';
    } 
    else if (location.state?.referrer === 'admin-delete-user') {
        message = 'The account has been permanently deleted!';
        linkTo = '/admin-users';
        actionText = 'Users';
    } 
    else if (location.state?.referrer === 'userdata') {
        message = 'Your user data has been updated successfully.';
        linkTo = '/';
        actionText = 'Home';
    } else if (location.state?.referrer === 'resetpasswd') {
        message = 'Your password has been updated successfully.';
        linkTo = '/login';
        actionText = 'Login';
    } else if (location.state?.referrer === 'cancel') {
        message = 'Your package has been canceled successfully.';
        linkTo = '/history';
        actionText = 'History';
    }
    else {
        message = '';
        linkTo = '/';
        actionText = 'Home';
    }

    return (
        <div className="container send-container">
            <div className="send-box">
                <h2>Thank you for using PackX!</h2>
                <p>{message}</p>
                <Link to={linkTo} className="btn login-btn">{actionText}</Link>
            </div>
        </div>
    );
};
