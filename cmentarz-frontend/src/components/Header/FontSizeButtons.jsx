import React, { useState } from 'react';

const FontSizeButtons = () => {
  const [fontSize, setFontSize] = useState({
    big: 32,
    medium: 20,
    small: 16
  });

  const fontSizeLimits = {
    big: { min: 20, max: 45 },
    medium: { min: 12, max: 35 },
    small: { min: 10, max: 27 }
  };

  const adjustFontSizes = (factor) => {
    setFontSize(prev => {
      const newBig = Math.min(fontSizeLimits.big.max, Math.max(fontSizeLimits.big.min, prev.big * factor));
      const newMedium = Math.min(fontSizeLimits.medium.max, Math.max(fontSizeLimits.medium.min, prev.medium * factor));
      const newSmall = Math.min(fontSizeLimits.small.max, Math.max(fontSizeLimits.small.min, prev.small * factor));

      return {
        big: newBig,
        medium: newMedium,
        small: newSmall
      };
    });
  };

  const updateCSSVariables = () => {
    document.documentElement.style.setProperty('--font-size-big', `${fontSize.big}px`);
    document.documentElement.style.setProperty('--font-size-medium', `${fontSize.medium}px`);
    document.documentElement.style.setProperty('--font-size-small', `${fontSize.small}px`);
  };

  React.useEffect(() => {
    updateCSSVariables();
  }, [fontSize]);

  return (
    <div>
    <button className='font-size-button' onClick={() => adjustFontSizes(1.1)}>A+</button>
    <button className='font-size-button' onClick={() => adjustFontSizes(0.9)}>A--</button>
    </div>
  );
};

export default FontSizeButtons;