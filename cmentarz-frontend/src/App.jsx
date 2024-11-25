import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ModalDisplay from './components/Decor/ModalDisplay';
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage';
import Contact from './components/Contact';
import Footer from './components/Footer';

import 'leaflet-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalImage, setModalImage] = useState('http://localhost:8000/images/graves/grave_1001.jpg');

  const closeModal = () =>{
    console.log("Zamykanie");
    setModalImage('');
  }

  useEffect(() => {
    document.title = 'Cmentarz w Brzesku';
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  

  return (
    <Router>
      {modalImage !== '' && 
        <ModalDisplay
          modalImage={modalImage}
          closeModal={closeModal}
        />
      }
      <header>
        <Header
          toggleMenu={toggleMenu}
        />
        <div className={`navbar ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={toggleMenu}>Mapa</Link>
          <Link to="/kontakt" onClick={toggleMenu}>Kontakt</Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<HomePage setModalImage={setModalImage}/>}/>
        <Route path="/kontakt" element={<Contact/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
