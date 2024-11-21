import React, { useState } from 'react';

const FontSizeButtons = () => {
  const [fontSize, setFontSize] = useState({
    big: 32,
    medium: 20,
    small: 16
  });

  const fontSizeLimits = {
    big: { min: 24, max: 40 },
    medium: { min: 15, max: 30 },
    small: { min: 12, max: 24 }
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
    <>
    <button className='font-size-button' onClick={() => adjustFontSizes(1.1)}>A+</button>
    <button className='font-size-button' onClick={() => adjustFontSizes(0.9)}>A--</button>
    </>
  );
};

export default FontSizeButtons;