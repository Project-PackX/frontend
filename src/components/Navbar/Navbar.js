import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/auth';
import decode from 'jwt-decode';

import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const access_level = decode(localStorage.getItem('token')).access_level
  // const access_level = 1
  console.log(access_level)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {access_level === 1 ? (
        <Link to="/" class="navbar-brand mx-5">
          <img className="navbar-logo-user" src={require("../../assets/logos/packx_full_white.svg").default} alt="logo"/>
        </Link>
      ) : access_level === 2 ? (
          <Link to="/" class="navbar-brand mx-5">
            <img className="navbar-logo-courier" src={require("../../assets/logos/packx_full_white_courier.svg").default} alt="logo"/>
          </Link>
      ) : (
          <Link to="/" class="navbar-brand mx-5">
            <img className="navbar-logo-admin" src={require("../../assets/logos/packx_full_white_admin.svg").default} alt="logo"/>
          </Link>
      )}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end align-items-end mx-5" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          {isLoggedIn ? (
            <li className="nav-item dropdown">
              {access_level === 2 ? (
                  <>
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                      Delivery
                    </a>
                    <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
                      <li>
                        <Link className="dropdown-item" to="/courier-packages">
                          <p className='button-text mb-0'>Packages</p>
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/courier-lockers">
                          <p className='button-text mb-0'>Lockers</p>
                        </Link>
                      </li>
                    </ul>
                  </>
              ) : null}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                Package
              </a>
              <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
                <li>
                  <Link className="dropdown-item" to="/track">
                    <p className='button-text mb-0'>Track</p>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dispatch">
                    <p className='button-text mb-0'>Dispatch</p>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/history">
                    <p className='button-text mb-0'>History</p>
                  </Link>
                </li>
              </ul>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                User
              </a>
              <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
                <li>
                  <Link className="dropdown-item" to="/userdata">
                    <p className='button-text mb-0'>Edit user data</p>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/resetpasswd">
                    <p className='button-text mb-0'>Reset password</p>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/deleteuser">
                    <p className='button-text mb-0'>Delete account</p>
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/track">
                <p className='button-text mb-0'>Track</p>
              </Link>
            </li>
          )}
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
            {isLoggedIn ? (
              <button
                className="button button-primary"
                onClick={logout}
              >
                <Link className="logout-button" to="/">
                <p className='button-text mb-0'>Log out, {localStorage.getItem("name")}</p>
                </Link>
              </button>
            ) : (
              <Link className="button button-primary" to="/login">
                <p className='button-text mb-0'>Log in</p>
              </Link>
              )}
              </li>
            </ul>
          </div>
    </nav>
  );
};