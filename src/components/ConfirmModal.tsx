import React from 'react';
import './ConfirmModal.css';

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<Props> = ({ message, onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
      <p className="modal-msg">{message}</p>
      <div className="modal-actions">
        <button className="modal-btn cancel" onClick={onCancel}>Скасувати</button>
        <button className="modal-btn confirm" onClick={onConfirm}>Видалити</button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
