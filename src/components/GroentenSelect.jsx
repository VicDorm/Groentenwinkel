import React, { useEffect, useState } from 'react';
import { getGroenten } from '../services/DataService';

const GroentenSelect = ({ onSelect }) => {
  const [groenten, setGroenten] = useState([]);

  useEffect(() => {
    getGroenten().then(data => setGroenten(data));
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Selecteer een groente</option>
      {groenten.map((groente, index) => (
        <option key={index} value={groente.naam}>
          {groente.naam} - {groente.prijs} EUR/{groente.eenheid}
        </option>
      ))}
    </select>
  );
};

export default GroentenSelect;