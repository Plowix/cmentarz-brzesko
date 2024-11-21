import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <meta name="author" content="Paweł Szczypuła" />
    <meta name="description" content="Strona zabytkowego cmentarza parafialnego w Brzesku"/>
    <App />
  </React.StrictMode>
);
