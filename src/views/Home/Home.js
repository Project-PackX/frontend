import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export const Home = () => {
    return (
        <main>
            <div className="container">
                <div className="hero row col-12">
                    <div className="hero-content col-md-6">
                        <h1>Make your life easier <br/> with <span>PackX!</span></h1>
                        <p>Send and receive packages was never quicker and easier.</p>
                        <Link to="/register" className="login-btn py-3 px-4 my-5">Get Started</Link>
                    </div>
                    <div className="hero-image col-md-6">
                        <img src={require('../../assets/images/undraw_delivery_truck_vt6p.svg').default} alt="hero" />
                    </div>
                </div>
            </div>
            <div className="features row col-12">
                <div className="container">
                    <div className="feature col-md-4">
                        <h3>Really fast</h3>
                        <p>With the PackX Rapid Delivery your package arrives in 3 business days to your selected destination.</p>
                    </div>
                    <div className="feature col-md-4">
                        <h3>Eco-friendly</h3>
                        <p>Our couriers are using 100% electric delivery trucks, we save tons of CO<sub>2</sub> every day.</p>
                    </div>
                    <div className="feature col-md-4">
                        <h3>24/7 Accessibility</h3>
                        <p>Our package delivery service is available around the clock, ensuring you can send or receive your packages at any time that suits you.</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="sending row col-12">
                    <div className="title col-md-6">
                        <h2>Send your package now</h2>
                    </div>
                    <div className="image col-md-6">
                        <p>Send your package easily from a locker to another one.</p>
                    </div>
                </div>
                <div className="sending-boxes row col-12">
                    <div className="sending-box col-md-4">
                        <h2>Create an account</h2>
                        <img src={require('../../assets/images/undraw_female_avatar_efig.svg').default} alt="box" />
                        <p>You can only dispatch a package if you have a PackX Account. <Link to="/register" className="link">Register now</Link> and get the full experience.</p>
                    </div>
                    <div className="sending-box col-md-4">
                        <h2>Give the package details</h2>
                        <img src={require('../../assets/images/undraw_server_status_re_n8ln.svg').default} alt="box" />
                        <p>You can select the closest locker to you and the destination locker too. Select the size of the package and the delivery method.</p>
                    </div>
                    <div className="sending-box col-md-4">
                        <h2>Track your package</h2>
                        <img src={require('../../assets/images/undraw_location_tracking_re_n3ok.svg').default} alt="box" />
                        <p>You can follow along your package and get a notification when it arrives at the destination.</p>
                    </div>
                </div>
            </div>
            <div className="checkrates features row col-12">
                <div className="container">
                    <div className="checkrates-img col-md-6">
                        <img src={require("../../assets/images/undraw_mobile_search_jxq5.svg").default} alt="login" />
                    </div>
                    <div className="checkrates-form form-container col-md-6 mt-5">
                        <h1 className="title">Check rates</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">From</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option defaultValue>Select the starting location</option>
                                    <option value="1">Győr</option>
                                    <option value="2">Szombathely</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">To</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option defaultValue>Select the destination</option>
                                    <option value="1">Győr</option>
                                    <option value="2">Szombathely</option>
                                </select>
                            </div>
                            <button type="submit" className="login-btn">Check rates</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}