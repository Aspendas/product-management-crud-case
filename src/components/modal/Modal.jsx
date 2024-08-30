import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" aria-modal="true" role="dialog">
      <div className="modal-content">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
