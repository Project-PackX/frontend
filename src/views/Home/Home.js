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
            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Deliveries made easy</h2>
                    <p className="data-subtitle-left">No more worries about packages.</p>
                    <p className="data" >Our team members are effortlessly working 
                    to make every one of our customers delighted. PackX’s networking
                     service provides exceptional care to both the customer and the package,
                      while maintaining quality.</p>
                </div>
                <div className="image-right">
                    <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="login" />
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="data-container">
                <div className="image-left">
                    <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="login" />
                </div>
                <div className="text">
                    <h2 className="title content-right">Always on time</h2>
                    <p className="data-subtitle-right">In a hurry? We got you covered.</p>
                    <p className="data" >We all now that feeling when a crucial item is
                     on its way to us, and we feel that the package is never arriving. 
                     PackX offers a 3 day guarantee on deliveries in certain countries 1*. 
                    You can relax and our service will take care of the rest.</p>
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="trusted-awards-container">
                <h2 className="title">Trusted by</h2>
                <div className="logo-container">
                    <div className="logo-column">
                        <img src={require("../../assets/logos/otp.png").default} alt="Logo 1" />
                    </div>
                    <div className="logo-column">
                        <img src={require("../../assets/logos/aqua.png").default} alt="Logo 2" />
                    </div>
                    <div className="logo-column">
                        <img src={require("../../assets/logos/alza.png").default} alt="Logo 3" />
                    </div>
                    <div className="logo-column">
                        <img src={require("../../assets/logos/emag.png").default} alt="Logo 4" />
                    </div>
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="trusted-awards-container">
                <h2 className="title">Awards and certificates</h2>
                <div className="logo-container">
                    <div className="logo-column">
                        <img src={require("../../assets/logos/pay.png").default} alt="Logo 1" />
                    </div>
                    <div className="logo-column">
                        <img src={require("../../assets/logos/startup.png").default} alt="Logo 2" />
                    </div>
                    <div className="logo-column">
                        <img src={require("../../assets/logos/iso.png").default} alt="Logo 3" />
                    </div>
                </div>
            </div>
        </>
    );
}