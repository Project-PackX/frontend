import './pagenotfound.css';
import notFoundImage from '/assets/images/undraw_page_not_found_re_e9o6.svg';

export const PageNotFound = () => (
  <div className="error-container">
    <img src={notFoundImage} alt="404" className="error-image" />
    <p className="error-text">Oops! It seems this page has gone on a digital vacation.</p>
  </div>
);
