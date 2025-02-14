import React from 'react';

const EuroDollarToggle = ({ currency, onToggle }) => {
  return (
    <button onClick={onToggle}>
      {currency === 'EUR' ? 'Convert to USD' : 'Convert to EUR'}
    </button>
  );
};

export default EuroDollarToggle;