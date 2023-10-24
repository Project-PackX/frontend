import React, { useState, useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";
import "./customcursor.css";

export default function CustomCursor() {
  return (
    <div className="App">
      <AnimatedCursor
        innerSize={13}
        outerSize={13}
        color='142, 154, 175'
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
        trailingSpeed={5}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link',
        ]}
        hideNativeCursor={true}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}
