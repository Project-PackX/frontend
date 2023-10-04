import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" class="navbar-brand mx-5">
        <img className="navbar-logo" src={require("../../assets/images/packx_logo_full_white.png")} alt="logo" />
      </Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end align-items-end mx-5" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Link className="nav-link" to="/track">
              <p className='button-text mb-0'>Track</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/aboutus">
              <p className='button-text mb-0'>About us</p>
            </Link>
          </li>
          <li className="nav-item">
              <Link className="button button-secondary" to="/contactus">
                <p className='button-text mb-0'>Contact us</p>
              </Link>
          </li>
          <li className="nav-item">
              <Link className="button button-primary" to="/login">
              <p className='button-text mb-0'>Login</p>
              </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};