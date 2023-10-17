import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';

import './navbar.css';

export const Navbar = () => {

    const { isLoggedIn, logout } = useAuth(); // Access the isLoggedIn state and logout function

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
                { isLoggedIn ? (
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                            <li><a class="dropdown-item" href="#">History</a></li>
                        </ul>
                    </li>
                ) : (
                  <li class="nav-item">
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
                            <p className='button-text mb-0'>Log out, {localStorage.getItem("name")}</p>
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