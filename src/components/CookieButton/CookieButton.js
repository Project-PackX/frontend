import React from "react";
import CookieConsent from "react-cookie-consent";
import "./cookiebutton.css";

export const CookieButton = () => {
  return (
    <div className="cookie-button">
      <CookieConsent
        location="bottom"
        buttonPosition="center"
        buttonText="Accept"
        enableDeclineButton
        declineButtonText="Decline"
        expires={10}
        style={{
          position: "fixed",
          width: "18rem", 
          height: "10rem", 
          padding: "1rem", 
          background: "var(--purple)",
          background: 'linear-gradient(90deg, var(--purple) 0%, var(--blue) 100%)',
          borderRadius: "1.5rem", 
          boxShadow: "0 0 1rem rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9997,
        }}
        declineButtonStyle={{
          fontSize: "1rem",
          background: "var(--red)",
          borderRadius: "1rem", 
          padding: "1rem",
          color: "white",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          outline: "none",
          zIndex: 9998,
        }}
        buttonStyle={{
          fontSize: "1rem", /* Adjust font size in rem units */
          background: "var(--green)",
          borderRadius: "1rem",
          padding: "1rem",
          color: "white",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          outline: "none",
          zIndex: 9998,
        }}
        content={
          <div style={{ color: "white", fontSize: "1rem", zIndex: 9999 }}>
            <h1>Cookie and Privacy Policy consent</h1>
          </div>
        }
      />
    </div>
  );
};
