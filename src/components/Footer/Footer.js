import { Link } from "react-router-dom";
import "./footer.css";

export const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 custom-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="contact-info">
              <p>Email: info@packx.com</p>
              <p>Phone: +36 20 123 45 67</p>
            </div>
          </div>
          <div className="footer-center">
            <Link className="footer-link" to="/">
            <img className="foot-logo" src={require("../../assets/logos/packx_trans.png")} alt="logo" />
            </Link>
          </div>
          <div className="footer-right">
            <div className="address">
              <p>Tibormajori utca 70</p>
              <p>Győr, Hungary</p>
            </div>
            <Link className="footer-link" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()} PackX - All rights reserved -{" "}
          <Link className="footer-link" to="/policy">
            Terms and conditions
          </Link>
        </p>
      </div>
    </footer>
  );
}



