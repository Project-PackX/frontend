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
        expires={150}
        style={{
          position: "fixed",
          width: "250px",
          height: "200px",
          padding: "1px",
          background: "var(--purple)",
          background: 'linear-gradient(90deg, var(--purple) 0%, var(--blue) 100%)',
          borderRadius: "15%",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9997,
        }}
        declineButtonStyle={{
          fontSize: "10px",
          background: "var(--red)",
          borderRadius: "10px",
          padding: "10px",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          outline: "none",
          zIndex: 9998,
        }}
        buttonStyle={{
          fontSize: "10px",
          background: "var(--green)",
          borderRadius: "10px",
          padding: "10px",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          outline: "none",
          zIndex: 9998,
        }}
        content={
          <div style={{ color: "white", fontSize: "16px", zIndex: 9999 }}>
            <h1>Cookie and Privacy Policy consent</h1>
          </div>
        }
      />
    </div>
  );
};
