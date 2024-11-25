import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
    
        console.log('Dane logowania:', { username, password });
    
        const response = await fetch(`${apiUrl}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            credentials: 'include', // Ważne dla ciasteczek sesji
        });
    
        // Zapisz odpowiedź w konsoli przed jej próbowaniem sparsować
        const text = await response.text();
        console.log('Odpowiedź serwera:', text);
    
        try {
            const data = JSON.parse(text);  // Próba parsowania odpowiedzi jako JSON
            if (data.user) {
                console.log('Zalogowano pomyślnie', data.user);
                window.location.href = '/'; // Przekierowanie po zalogowaniu
            } else {
                setError(data.error || 'Nieznany błąd');
            }
        } catch (error) {
            console.error('Błąd przy parsowaniu JSON:', error);
            setError('Błąd odpowiedzi serwera');
        }
    };
    

    return (
        <main className="login-container">
            <h2>Logowanie</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Nazwa użytkownika:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Zaloguj się</button>
            </form>
        </main>
    );
};

export default Login;
