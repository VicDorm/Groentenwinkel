import React from 'react';

const EuroDollarToggle = ({ currency, onToggle }) => {
  return (
    <button 
    className="btn btn-primary"
    onClick={onToggle}
    >
      {currency === 'EUR' ? 'USD' : 'EUR'}
    </button>
  );
};

export default EuroDollarToggle;