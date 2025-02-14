import React, { useState, useEffect } from 'react';
import GroentenSelect from './components/GroentenSelect';
import WinkelSelect from './components/WinkelSelect';
import Winkelkar from './components/Winkelkar';
import EuroDollarToggle from './components/EuroDollarToggle';
import { getExchangeRate } from './services/EuroDollarService'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [selectedGroenten, setSelectedGroenten] = useState('');
  const [selectedWinkel, setSelectedWinkel] = useState('');
  const [aantal, setAantal] = useState(0);
  const [winkelkar, setWinkelkar] = useState([]);
  const [currency, setCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    getExchangeRate().then(rate => setExchangeRate(rate));
  }, []);

  const handleBestel = () => {
    const newItem = {
      groenten: selectedGroenten,
      aantal: aantal,
      prijs: parseFloat(selectedGroenten.split(' - ')[1]),
    };

    const existingItemIndex = winkelkar.findIndex(item => item.groenten === newItem.groenten && item.winkel === selectedWinkel);

    if (existingItemIndex !== -1) {
      const updatedWinkelkar = [...winkelkar];
      updatedWinkelkar[existingItemIndex].aantal += newItem.aantal;
      setWinkelkar(updatedWinkelkar);
    } else {
      setWinkelkar([...winkelkar, { ...newItem, winkel: selectedWinkel }]);
    }
  };

  const handleEuroDollarToggle = () => {
    setCurrency(currency === 'EUR' ? 'USD' : 'EUR');
  };

  return (
    <div className="container">
      <h1>Online Groentenwinkel</h1>
      <div className="form-group">
        <WinkelSelect onSelect={setSelectedWinkel} />
      </div>
      <div className="form-group">
        <GroentenSelect onSelect={setSelectedGroenten} />
      </div>
      <div className="form-group">
        <input
          type="number"
          value={aantal}
          onChange={(e) => setAantal(parseFloat(e.target.value))}
          placeholder="Aantal"
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handleBestel}
        disabled={!selectedWinkel || !selectedGroenten || aantal <= 0}
      >
        Bestel
      </button>
      <EuroDollarToggle currency={currency} onToggle={handleEuroDollarToggle} />
      <Winkelkar items={winkelkar} currency={currency} exchangeRate={exchangeRate} />
    </div>
  );
};

export default App;