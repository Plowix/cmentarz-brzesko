import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import ModalDisplay from './components/Decor/ModalDisplay';
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/UserOnly/Login';
import AdminPanel from './components/UserOnly/AdminPanel';

function RouterContent(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    const closeModal = () => {
      setModalImage('');
    }

    useEffect(() => {
      console.log('User updated:', user);
    }, [user]);
  
    useEffect(() => {
      document.title = 'Cmentarz w Brzesku';
      checkSession();
    }, []);
  
    const apiUrl = process.env.REACT_APP_API_URL;
  
    console.log(apiUrl+'/check-session.php');
    const checkSession = async () => {
      const response = await fetch(apiUrl+'/check-session.php', {
        method: 'GET',
        credentials: 'include',
      });
  
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
      console.log(user);
    };
  
    const logout = async () => {
      const response = await fetch(apiUrl+'/logout.php', {
        method: 'GET',
        credentials: 'include',
      });
  
      const data = await response.json();
      setUser(null);
      navigate('/login');
    };
  
    const toggleMenu = () => {
      setMenuOpen((prev) => !prev);
    };

    return(
        <>
        {modalImage !== '' && 
            <ModalDisplay
              modalImage={modalImage}
              closeModal={closeModal}
            />
          }
          <header>
            <Header
              navigate={navigate}
              toggleMenu={toggleMenu}
            />
            <div className={`navbar ${menuOpen ? "open" : ""}`}>
              <Link to="/" onClick={toggleMenu}>Mapa</Link>
              <Link to="/kontakt" onClick={toggleMenu}>Kontakt</Link>
              {user && (
                <>
                  <Link to="/add-data" onClick={toggleMenu}>Dodaj dane</Link>
                  {user.role === 'admin' && <Link to="/admin-panel" onClick={toggleMenu}>Panel administracyjny</Link>}
                  <button onClick={logout}>Wyloguj</button>
                </>
              )}
            </div>
          </header>
          <Routes>
            <Route path="/" element={<HomePage setModalImage={setModalImage}/>}/>
            <Route path="/kontakt" element={<Contact/>}/>
            <Route path="/login" element={<Login setUser={setUser}/>}/>
            {user && user.role === 'admin' && (
                    <Route path="/admin-panel" element={<AdminPanel />} />
                )}
          </Routes>
          <Footer/>
          </>
    )
}

export default RouterContent;