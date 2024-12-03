import React, { useState } from 'react';

const ContactForm = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !subject || !message) {
            setError('Proszę wypełnić wszystkie pola.');
            return;
        }

        setError('');
    };

    return (
        <form className='contact-container' onSubmit={handleSubmit}>
            <h2>Formularz Kontaktowy</h2>
            
            <div className="input-container">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Twój email"
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="subject">Temat:</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Temat wiadomości"
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="message">Wiadomość:</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Treść wiadomości"
                    required
                />
            </div>

            {error && <div className="wrong-input">{error}</div>}

            <button className="contact-button btn btn-outline-secondary" type="submit">
                Wyślij wiadomość
            </button>
        </form>
    );
};

export default ContactForm;