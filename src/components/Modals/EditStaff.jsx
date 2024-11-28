// src/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, data, onSubmit }) => {
    if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    data[name] = value; // Update the respective field
  };

    return (
        <div>
            
        </div>
    );
};

export default Modal;
