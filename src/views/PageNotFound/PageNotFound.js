import React from 'react';

import './pagenotfound.css';

export const PageNotFound = () => {
    return (
        <div className="error-container">
            <img src={require('../../assets/images/404.webp')} alt="404" />
            <p className="my-5"> Error: This page has gone on a digital vacation!</p>
        </div>
    );
};