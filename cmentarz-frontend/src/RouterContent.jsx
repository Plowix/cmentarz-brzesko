import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import ModalDisplay from './components/Decor/ModalDisplay';
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage';
import Contact from './components/Contact/Contact';
import History from './components/History/History';
import Footer from './components/Footer';
import Login from './components/UserOnly/Login';
import AdminPanel from './components/UserOnly/AdminPanel';
import AddData from './components/UserOnly/AddData/AddData';

function RouterContent(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [user, setUser] = useState(null);
    const [loadingFlag, setLoadingFlag] = useState(false);

    const handleLoadingFlag = (newState) => {
      setLoadingFlag(newState);
      if(newState === true) document.body.classList.add('loading');
      else document.body.classList.remove('loading');
  }

    const navigate = useNavigate();
  
    const closeModal = () => {
      setModalImage('');
    }
  
    useEffect(() => {
      document.title = 'Cmentarz w Brzesku';
      checkSession();
    }, []);
  
    const apiUrl = process.env.REACT_APP_API_URL;
  
    const checkSession = async () => {
      const cachedUser = sessionStorage.getItem('user');
      if (cachedUser) {
        setUser(JSON.parse(cachedUser)); 
        verifySessionInBackground();
      } else {
        await verifySessionFromBackend(); 
      }
    };
    
    const verifySessionInBackground = async () => {
      const response = await fetch(apiUrl + '/check-session.php', {
        method: 'GET',
        credentials: 'include',
      });
    
      const data = await response.json();
      if (!data.user) {
        setUser(null); 
        sessionStorage.removeItem('user');
      }
    };
    
    const verifySessionFromBackend = async () => {
      const response = await fetch(apiUrl + '/check-session.php', {
        method: 'GET',
        credentials: 'include',
      });
    
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
        sessionStorage.setItem('user', JSON.stringify(data.user)); // Zapisz cache
      } else {
        setUser(null);
      }
    };
    
  
    const logout = async () => {
      const response = await fetch(apiUrl+'/logout.php', {
        method: 'GET',
        credentials: 'include',
      });
      handleLoadingFlag(false)
  
      const data = await response.json();
      localStorage.removeItem('user');
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
              <Link to="/historia" onClick={toggleMenu}>Historia</Link>
              {user && (
                <>
                  <Link to="/dodaj-dane" onClick={toggleMenu}>Dodaj dane</Link>
                  {user.role === 'admin' && <Link to="/admin-panel" onClick={toggleMenu}>Panel administracyjny</Link>}
                  <button 
                    className={loadingFlag ? 'loading' : ''}
                    onClick={(e)=>{
                      logout();
                      setLoadingFlag(true);
                      }}>
                      Wyloguj
                  </button>
                </>
              )}
            </div>
          </header>
          <Routes>
            <Route path="/" element={<HomePage user={user} setModalImage={setModalImage}/>}/>
            <Route path="/kontakt" element={<Contact/>}/>
            <Route path="/historia" element={<History/>}/>
            <Route path="/login" element={<Login loadingFlag={loadingFlag} handleLoadingFlag={handleLoadingFlag} setUser={setUser}/>}/>

            <Route path='dodaj-dane' element={user ? <AddData/> : <Login loadingFlag={loadingFlag} handleLoadingFlag={handleLoadingFlag} setUser={setUser}/>}/>
            <Route path="/admin-panel" element={user && user.role==='admin' ? <AdminPanel /> : <Login loadingFlag={loadingFlag} handleLoadingFlag={handleLoadingFlag} setUser={setUser}/>} />
          </Routes>
          <Footer/>
          </>
    )
}

export default RouterContent;