import React, { useState, useEffect } from "react";
import GroentenSelect from "./components/GroentenSelect";
import WinkelSelect from "./components/WinkelSelect";
import Winkelkar from "./components/Winkelkar";
import EuroDollarToggle from "./components/EuroDollarToggle";
import { getExchangeRate } from "./services/EuroDollarService";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const App = () => {
  const [selectedGroenten, setSelectedGroenten] = useState("");
  const [selectedWinkel, setSelectedWinkel] = useState("");
  const [aantal, setAantal] = useState(0);
  const [winkelkar, setWinkelkar] = useState([]);
  const [currency, setCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(1);

  const handleBestel = () => {
    if (!selectedGroenten || isNaN(selectedGroenten.prijs)) {
      console.error("Geen geldige groente geselecteerd.");
      return;
    }

    const newItem = {
      groenten: selectedGroenten.naam,
      aantal: aantal,
      prijs: selectedGroenten.prijs,
      winkel: selectedWinkel
    };

    setWinkelkar([...winkelkar, newItem]);

    const existingItemIndex = winkelkar.findIndex(
      item =>
        item.groenten === newItem.groenten && item.winkel === selectedWinkel
    );

    if (existingItemIndex !== -1) {
      const updatedWinkelkar = [...winkelkar];
      updatedWinkelkar[existingItemIndex].aantal += newItem.aantal;
      setWinkelkar(updatedWinkelkar);
    } else {
      setWinkelkar([...winkelkar, { ...newItem, winkel: selectedWinkel }]);
    }
  };

  const handleEuroDollarToggle = async () => {
    const newCurrency = currency === 'EUR' ? 'USD' : 'EUR';
    setCurrency(newCurrency);

    // Alleen een nieuwe wisselkoers ophalen als we naar USD schakelen
    if (newCurrency === 'USD') {
      const rate = await getExchangeRate('EUR', 'USD');
      setExchangeRate(rate);
    } else {
      setExchangeRate(1);
    }
  };

  return (
    <div className="container">
      <h1>Groentenwinkelketen de vrolijke konijnen.</h1>
      <p>
        Bestel nu! En we maken een onrealistische belofte! (dat we leveren
        binnen een uur!)
      </p>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label className="form-label mb-0">Kies een winkel:</label>
        </div>
        <div className="col-9">
          <WinkelSelect onSelect={setSelectedWinkel} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label className="form-label mb-0">Kies een groente:</label>
        </div>
        <div className="col-9">
          <GroentenSelect onSelect={setSelectedGroenten} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label className="form-label mb-0">Hoeveel moet je hebben?</label>
        </div>
        <div className="col-9 position-relative">
          <input
            type="number"
            className="form-control"
            value={aantal}
            onChange={e => {
              const value = parseFloat(e.target.value);
              if (value >= 0 || e.target.value === "") {
                setAantal(value);
              }
            }}
            placeholder="Aantal"
            min="0"
            step="1"
          />
          {aantal % 1 !== 0 &&
            <small
              className="text-danger position-absolute"
              style={{ top: "100%", left: 0 }}
            >
              Enkel bij /kg aub.
            </small>}
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleBestel}
        disabled={!selectedWinkel || !selectedGroenten || aantal <= 0}
      >
        Bestel
      </button>
      <EuroDollarToggle currency={currency} onToggle={handleEuroDollarToggle} />
      <Winkelkar
        items={winkelkar}
        currency={currency}
        exchangeRate={exchangeRate}
      />
    </div>
  );
};

export default App;
