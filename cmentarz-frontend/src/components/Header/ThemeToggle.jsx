import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = () => {
  const storedTheme = localStorage.getItem('isDarkMode') === 'true';
  const [isDarkMode, setIsDarkMode] = useState(storedTheme);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('isDarkMode', newMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-dark)');
      document.documentElement.style.setProperty('--bg-secondary-color', 'var(--bg-secondary-color-dark)');
      document.documentElement.style.setProperty('--text-color', 'var(--text-color-dark)');
      document.documentElement.style.setProperty('--text-secondary-color', 'var(--text-secondary-color-dark)');
    } else {
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-light)');
      document.documentElement.style.setProperty('--bg-secondary-color', 'var(--bg-secondary-color-light)');
      document.documentElement.style.setProperty('--text-color', 'var(--text-color-light)');
      document.documentElement.style.setProperty('--text-secondary-color', 'var(--text-secondary-color-light)');
    }
  }, [isDarkMode]);

  return (
    <button className='theme-toggle' onClick={toggleTheme}>
      {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
    </button>
  );
};

export default ThemeToggle;
