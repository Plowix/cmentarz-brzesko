import React from 'react';
import './Modal.css'; 
import Spinner from './Spinner';

const Modal = ({ modalImage, closeModal }) => {
    if (modalImage === '') return null;

    return (
    <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-overlay-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>
            ×
        </button>
        <img src={modalImage} alt="Modal content" className="modal-display-image" />
        <Spinner/>
        </div>
    </div>
    );
};

export default Modal;