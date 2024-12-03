import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import ModalDisplay from './components/Decor/ModalDisplay';
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage';
import Contact from './components/Contact/Contact';
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
      console.log("Próbuję");
      setModalImage('');
    }
  
    useEffect(() => {
      document.title = 'Cmentarz w Brzesku';
      checkSession();
    }, []);
  
    const apiUrl = process.env.REACT_APP_API_URL;
  
    const checkSession = async () => {
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      } else {
        const response = await fetch(apiUrl + '/check-session.php', {
          method: 'GET',
          credentials: 'include',
        });
  
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user)); 
        } else {
          setUser(null);
        }
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
            <Route path="/login" element={<Login loadingFlag={loadingFlag} handleLoadingFlag={handleLoadingFlag} setUser={setUser}/>}/>
            {user &&
              <Route path='dodaj-dane' element={<AddData/>}/>
            }
            {user && user.role === 'admin' && (
                    <Route path="/admin-panel" element={<AdminPanel />} />
                )}
          </Routes>
          <Footer/>
          </>
    )
}

export default RouterContent;