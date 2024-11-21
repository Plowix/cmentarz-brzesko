import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage';
import Contact from './components/Contact';
import Footer from './components/Footer';

import 'leaflet-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'Cmentarz w Brzesku';
  }, []);
  

  return (
    <Router>
      <header>
        <Header/>
        <div className="navbar">
          <Link to="/">Mapa</Link> {" "}
          <Link to="/kontakt">Kontakt</Link> {" "}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/kontakt" element={<Contact/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
