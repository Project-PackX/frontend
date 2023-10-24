import React, { useState, useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";
import "./customcursor.css";

const defaultCursorColor = '127, 90, 246';
const alternativeCursorColor = '0, 159, 219';

export default function CustomCursor() {
  const [cursorColor, setCursorColor] = useState(defaultCursorColor);

  const isSimilarColor = (color1, color2, threshold) => {
    const rgb1 = color1.match(/\d+/g).map(Number);
    const rgb2 = color2.split(',').map(Number);
    const distance = Math.sqrt(
      rgb1.reduce((acc, val, index) => acc + (val - rgb2[index]) ** 2, 0)
    );
    const maxDistance = Math.sqrt(255 ** 2 * 3);

    return distance / maxDistance < threshold;
  };

  useEffect(() => {
    const updateCursorColor = (event) => {
      if (!event.clientX || !event.clientY) return;

      const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);
      if (!elementUnderCursor) return;

      const elementStyles = window.getComputedStyle(elementUnderCursor);
      const backgroundColor = elementStyles.backgroundColor;

      if (isSimilarColor(backgroundColor, cursorColor, 0.60)) {
        if (cursorColor !== defaultCursorColor) setCursorColor(defaultCursorColor);
      } else {
        if (cursorColor !== alternativeCursorColor) setCursorColor(alternativeCursorColor);
      }
    };

    const onMouseMove = (event) => {
      requestAnimationFrame(() => updateCursorColor(event));
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [cursorColor]);

  return (
    <div className="App">
      <AnimatedCursor
        innerSize={13}
        outerSize={13}
        color={cursorColor}
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
