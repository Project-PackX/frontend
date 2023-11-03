import React, { useState, useEffect } from "react";
import "./contact.css";

export const Contact = () => {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const downloadVCard = () => {
    const vCardUrl = "/assets/vcf/packx.vcf";

    const a = document.createElement("a");
    a.href = vCardUrl;
    a.download = "packx.vcf";
    a.click();
  };

  return (
    <div className="contact-container">
      <div className="features row col-12">
        <div className="contact-data-container">
          <div className="feature contact-data col-md-6">
            <h1 className="contact-title">Management warehouse</h1>
            <h1 className="contact-subtitle">Hungary - Győr-Moson-Sopron - 9028 Győr, Tibormajori Utca 70</h1>
            <h2>
              <a href="tel:+36201234567">+36 20 123 45 67</a>
            </h2>
            <h2>
              <a href="mailto:info@packx.hu">info@packx.hu</a>
            </h2>
            <button onClick={downloadVCard} className="instant-contact-button">
              Instant contact
            </button>
          </div>
          <div className="feature col-md-6">
            <div className="contact-map">
              {showMap ? (
                <iframe
                  title="Warehouse location"
                  width="800rem"
                  height="450rem"
                  style={{ border: 0, display: showMap ? "block" : "none" }}
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=47.6804636,17.7461013&hl=en&z=14&output=embed`}
                />
              ) : (
                <div className="loading-logo-contact">
                  <img src={"../../assets/loading/loading_trans.gif"} alt="loading" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
