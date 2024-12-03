import React, { useState } from 'react';

import './Login.css'

const Login = ({loadingFlag, handleLoadingFlag}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleLogin = async (e) => {
        handleLoadingFlag(true);
        e.preventDefault();
        
        const response = await fetch(`${apiUrl}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            credentials: 'include',
        });

        handleLoadingFlag(false);
    
        const text = await response.text();
    
        try {
            const data = JSON.parse(text);  
            if (data.user) {
                window.location.href = '/'; 
            } else {
                setError(data.error || 'Nieznany błąd');
            }
        } catch (error) {
            setError('Błąd odpowiedzi serwera');
        }
    };
    

    return (
        <main className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Logowanie</h2>
                <div className='input-container'>
                    <label htmlFor="username">Nazwa użytkownika:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Nazwa użytkownika'
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="password">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Hasło'
                        required
                    />
                </div>
                <div className="wrong-input">
                    {error && error}
                </div>
                <button 
                    className={'login-button btn btn-outline-secondary ' + (loadingFlag ? 'loading' : '')}
                    type="submit"
                    onClick={(e)=>{
                        if(username !== '' && password !== '')
                        handleLoadingFlag(true)
                    }}
                    >
                        {loadingFlag ? "Ładowanie..." : "Zaloguj się"} 
                </button>
            </form>
        </main>
    );
};

export default Login;
