import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/auth';
import decode from 'jwt-decode';

import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  let access_level = 1; // Default access level

  try {
    const token = localStorage.getItem('token');
    if (token) {
      ({access_level} = decode(token));
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    navigate('/login');
  }

  localStorage.setItem('access_level', access_level);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {access_level === 1 ? (
        <Link to="/" className="navbar-brand mx-5">
          <img className="navbar-logo-user" src={require("../../assets/logos/packx_full_white.svg").default} alt="logo"/>
        </Link>
      ) : access_level === 2 ? (
          <Link to="/" className="navbar-brand mx-5">
            <img className="navbar-logo-courier" src={require("../../assets/logos/packx_full_white_courier.svg").default} alt="logo"/>
          </Link>
      ) : (
          <Link to="/" className="navbar-brand mx-5">
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
                  <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle mx-2" href="#" id="navbarDarkDropdownMenuLinkDelivery" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                      Delivery
                    </a>
                    <ul className="dropdown-menu dropdown-menu-light">
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
                  </div>
              ) : null}
              {access_level === 3 ? (
                  <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle mx-2" href="#" id="navbarDarkDropdownMenuLinkDelivery" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                      Admin
                    </a>
                    <ul className="dropdown-menu dropdown-menu-light">
                      <li>
                        <Link className="dropdown-item" to="/admin-users">
                          <p className='button-text mb-0'>Users</p>
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin-lockers">
                          <p className='button-text mb-0'>Lockers</p>
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin-packages">
                          <p className='button-text mb-0'>Packages</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
              ) : null}
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle mx-2" href="#" id="navbarDarkDropdownMenuLinkDelivery" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                  Package
                </a>
                <ul className="dropdown-menu dropdown-menu-light">
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
              </div>
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle mx-2" href="#" id="navbarDarkDropdownMenuLinkUser" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </a>
                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLinkUser">
                  <li>
                    <Link className="dropdown-item" to="/loyalty">
                      <p className='button-text mb-0'>Loyalty tier</p>
                    </Link>
                  </li>
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
                  {access_level !== 2 && (
                    <li>
                      <Link className="dropdown-item" to="/deleteuser">
                        <p className='button-text mb-0'>Delete account</p>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
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
                <button className="button button-primary" onClick={handleLogout}>
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