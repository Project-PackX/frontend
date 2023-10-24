import React, { useState, useEffect, useRef } from "react";
import AnimatedCursor from "react-animated-cursor";

export default function CustomCursor() {
  const defaultCursorColor = '127, 90, 246';
  const alternativeCursorColor = '0, 159, 219';
  const colorChangeInterval = 1;

  const [cursorColor, setCursorColor] = useState(defaultCursorColor);
  const [lastColorChangeTime, setLastColorChangeTime] = useState(0);

  useEffect(() => {
    const updateCursorColor = (event) => {
      if (!event.clientX || !event.clientY) {
        return;
      }

      const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);

      if (!elementUnderCursor) {
        return;
      }

      const elementStyles = window.getComputedStyle(elementUnderCursor);
      const backgroundColor = elementStyles.backgroundColor;

      if (isSimilarColor(backgroundColor, cursorColor, 0.55)) {
        if (cursorColor !== defaultCursorColor) {
          setCursorColor(defaultCursorColor);
          setLastColorChangeTime(Date.now());
        }
      } else {
        if (cursorColor !== alternativeCursorColor) {
          setCursorColor(alternativeCursorColor);
          setLastColorChangeTime(Date.now());
        }
      }

      requestAnimationFrame(updateCursorColor);
    };

    document.addEventListener('mousemove', updateCursorColor);

    return () => {
      document.removeEventListener('mousemove', updateCursorColor);
    };
  }, [cursorColor, lastColorChangeTime]);

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
    const timer = setInterval(() => {
      if (Date.now() - lastColorChangeTime >= colorChangeInterval) {
        setCursorColor(defaultCursorColor);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [lastColorChangeTime]);

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
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}
