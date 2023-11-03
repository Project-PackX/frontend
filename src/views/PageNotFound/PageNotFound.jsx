import React from "react";
import "./pagenotfound.css";

export const PageNotFound = () => {
  return (
    <div className="error-container">
      <img src="assets/images/undraw_page_not_found_re_e9o6.svg" alt="404" className="error-image" />
      <p className="error-text">Oops! It seems this page has gone on a digital vacation.</p>
    </div>
  );
};
