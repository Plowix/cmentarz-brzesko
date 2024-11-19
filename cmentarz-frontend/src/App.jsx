import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import Contact from './components/Contact';
import Footer from './components/Footer';

import 'leaflet-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <nav className='navbar'>
        <div className="top-bar">
          <h1>Zabytkowy Cmentarz Parafialny <br />w Brzesku</h1>
        </div>
        <div className="links">
          <Link to="/">Mapa</Link> {" "}
          <Link to="/kontakt">Kontakt</Link> {" "}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/kontakt" element={<Contact/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
