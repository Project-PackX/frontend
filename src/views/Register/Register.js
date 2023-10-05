import React from 'react';
import { Link } from 'react-router-dom';

import './register.css';

export const Register = () => {
    return (
        <div className="register container row col-12">
            <div className="col-md-6">
                <img src={require("../../assets/images/undraw_order_delivered_re_v4ab.svg").default} alt="register" />
            </div>
            <div className="form-container col-md-6 mt-5">
                <h1 className="title">Welcome back!</h1>
                <p className="subtitle">Please enter your details</p>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-input"
                            id="name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            id="email"
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
                    <div className="mb-3">
                        <label htmlFor="repassword" className="form-label">Re-Password</label>
                        <input
                            type="password"
                            className="form-input"
                            id="repassword"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="phone"
                            className="form-input"
                            id="phone"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms"
                                required
                            />
                            <label htmlFor="terms" className="form-check-label">Terms and Conditions</label>
                        </div>
                    </div>

                    <button type="submit" className="register-btn">Register</button>
                </form>
                <p className="login-text">Already have an account? <Link className="login-link" to="/login"> Sign In</Link></p>
            </div>
        </div>
    );
};
