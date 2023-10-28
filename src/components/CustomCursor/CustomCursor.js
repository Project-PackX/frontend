import React, { useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";
import "./customcursor.css";

export default function CustomCursor() {
  const cursorStyle = {
    innerSize: 13,
    outerSize: 13,
    color: '142, 154, 175',
    outerAlpha: 0.2,
    innerScale: 0.7,
    outerScale: 5,
    trailingSpeed: 5,
  };

  useEffect(() => {
    // Hide the native cursor using JavaScript
    const body = document.body;
    body.style.cursor = "none";

    // Ensure the cursor remains hidden by setting it to "none" again
    return () => {
      body.style.cursor = "none";
    };
  }, []);

  return (
    <div className="custom-cursor">
      <AnimatedCursor
        {...cursorStyle}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'select option',
          'textarea',
          'button',
          '.link',
          '.dropdown-menu',
          'dropdown-menu',
          'dropdown-item',
          '.dropdown-item',
          'form-label',
          '.form-label',
          '.form-select',
          'form-select',
          '.form-input',
          'form-input',
          '.form-check-input',
          'form-check-input',
          '.card',
          'card',
          '.card.package-size-card label',
          'card.package-size-card label',
          'location-map',
          '.location-map',
          'contact-title',
          '.contact-title',
          'contact-subtitle',
          '.contact-subtitle',
          'contact-data',
          '.contact-data',
          'scroll-btn',
          '.scroll-btn',
          'scroll-btn:hover',
          '.scroll-btn:hover',
        ]}
        hideNativeCursor={true}
      />
    </div>
  );
}
