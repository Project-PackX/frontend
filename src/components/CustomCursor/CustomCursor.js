import React from "react";
import AnimatedCursor from "react-animated-cursor"

export default function CustomCursor() {
  return (
    <div className="App">
    <AnimatedCursor
      innerSize={13}
      outerSize={13}
      color='127, 90, 246'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      trailingSpeed	={5}
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
        {
          target: '.custom',
          options: {
            innerSize: 12,
            outerSize: 12,
            color: '255, 255, 255',
            outerAlpha: 0.3,
            innerScale: 0.7,
            outerScale: 5
            
          }
        }
        
      ]}
    />
    </div>
  );
}