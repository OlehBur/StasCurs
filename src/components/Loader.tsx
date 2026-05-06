import React from 'react';
import './Loader.css';

const Loader: React.FC = () => (
  <div className="loader-overlay">
    <div className="loader-box">
      <div className="loader-spinner" />
      <span className="loader-text">Завантаження...</span>
    </div>
  </div>
);

export default Loader;
