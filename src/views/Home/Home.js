import React from 'react';
import './home.css';

export const Home = () => {
    return (
        <>
            <div className="background-image home-container">
                <div className="text">
                    <h1 className="title">Welcome to PackX</h1>
                    <p className="subtitle">The home of safe 'n fast deliveries.</p>
                    <button type="submit" className="home-btn">Send Package</button>
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="home-container">
                <div className="text">
                    <h2 className="title content-left">Deliveries made easy</h2>
                    <p>No more worries about packages.</p>
                </div>
                <div className="image-right">
                    <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="login" />
                </div>
            </div>
        </>
    );
}