import React from 'react';
import { Link } from 'react-router-dom';

import './login.css';

export const Login = () => {
    return (
        <div className="login container row col-12">
            <div className="form-container col-md-6 mt-5">
                <h1 className="title">Welcome back!</h1>
                <p className="subtitle">Please enter your details</p>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-input"
                            id="username"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            id="password"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Log In</button>
                </form>
                <p className="register-text">Don't have an account?<Link className="register-link" to="/register"> Sign Up</Link></p>
            </div>
            <div className="col-md-6">
                <img src={require("../../assets/images/undraw_delivery_truck_vt6p.svg").default} alt="login" />
            </div>
        </div>
    );
};
