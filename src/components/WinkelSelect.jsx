import React, { useEffect, useState } from 'react';
import { getWinkels } from '../services/DataService';

const WinkelSelect = ({ onSelect }) => {
  const [winkels, setWinkels] = useState([]);

  useEffect(() => {
    getWinkels().then(data => setWinkels(data));
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Selecteer een winkel</option>
      {winkels.map((winkel, index) => (
        <option key={index} value={winkel.naam} title={`${winkel.adres}, ${winkel.post} ${winkel.gemeente}`}>
          {winkel.naam}
        </option>
      ))}
    </select>
  );
};

export default WinkelSelect;