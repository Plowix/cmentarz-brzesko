import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-dark)');
      document.documentElement.style.setProperty('--bg-secondary-color', 'var(--bg-secondary-color-dark)');
      document.documentElement.style.setProperty('--text-color', 'var(--text-color-dark)');
      document.documentElement.style.setProperty('--text-secondary-color', 'var(--text-secondary-color-dark)');
    } else {
      // Tryb jasny
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-light)');
      document.documentElement.style.setProperty('--bg-secondary-color', 'var(--bg-secondary-color-light)');
      document.documentElement.style.setProperty('--text-color', 'var(--text-color-light)');
      document.documentElement.style.setProperty('--text-secondary-color', 'var(--text-secondary-color-light)');
    }
  }, [isDarkMode]);  

  return (
    <div>
      <button onClick={toggleTheme}>
        {isDarkMode ? 'Przełącz na tryb jasny' : 'Przełącz na tryb ciemny'}
      </button>
    </div>
  );
};

export default ThemeToggle;