import React, { useState, useEffect } from 'react';

import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        role: 'user',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(apiUrl + '/get-users.php', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();

            if (data.users) {
                setUsers(data.users);
            } else {
                setError(data.error || 'Błąd ładowania użytkowników');
            }
        };
        fetchUsers();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();

        const response = await fetch(apiUrl + '/add-user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
            credentials: 'include',
        });

        const data = await response.json();

        if (data.success) {
            setSuccess('Użytkownik został dodany pomyślnie');
            setNewUser({ username: '', password: '', role: 'user' });
        } else {
            setError(data.error || 'Błąd dodawania użytkownika');
        }
    };

    return (
        <main className='admin-container'>
            <h2>Panel Administracyjny</h2>
            <h3>Lista użytkowników</h3>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <table className='user-list'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Rola</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form className='add-user-form' onSubmit={handleAddUser}>
                <h3>Dodaj nowego użytkownika</h3>
                <div className='input-container'>
                    <label>Nazwa:</label>
                    <input
                        type="text"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        required
                    />
                </div>
                <div className='input-container'>
                    <label>Hasło:</label>
                    <input
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Rola:</label>
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <option value="user">Użytkownik</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>
                <button className='btn btn-outline-secondary' type="submit">Dodaj użytkownika</button>
            </form>
        </main>
    );
};

export default AdminPanel;
