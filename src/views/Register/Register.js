import React from 'react';
import { Link } from 'react-router-dom';

import './register.css';

export const Register = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Register</div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="passwordConfirm" placeholder="Confirm your password" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="town" className="form-label">Town</label>
                                    <input type="text" className="form-control" id="town" placeholder="Enter your town" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="acceptTerms" />
                                    <label className="form-check-label" htmlFor="acceptTerms">I accept the terms and conditions</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                        <div className="card-footer">
                            Already have an account? <Link to="/login">Login here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
