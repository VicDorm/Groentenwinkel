import React, { useState, useEffect } from "react";
import GroentenSelect from "./components/GroentenSelect";
import WinkelSelect from "./components/WinkelSelect";
import Winkelkar from "./components/Winkelkar";
import EuroDollarToggle from "./components/EuroDollarToggle";
import { getExchangeRate } from "./services/EuroDollarService";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [selectedGroenten, setSelectedGroenten] = useState("");
  const [selectedWinkel, setSelectedWinkel] = useState("");
  const [aantal, setAantal] = useState(0);
  const [winkelkar, setWinkelkar] = useState([]);
  const [currency, setCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleBestel = () => {
    if (!selectedGroenten || isNaN(selectedGroenten.prijs) || aantal <= 0) {
      console.error("Geen geldige groente of aantal geselecteerd.");
      return;
    }
  
    const newItem = {
      groenten: selectedGroenten.naam,
      aantal: parseFloat(aantal), 
      prijs: selectedGroenten.prijs,
      winkel: selectedWinkel
    };
  
    const existingItemIndex = winkelkar.findIndex(
      item => item.groenten === newItem.groenten && item.winkel === selectedWinkel
    );
  
    let updatedWinkelkar = [...winkelkar];
  
    if (existingItemIndex !== -1) {
      updatedWinkelkar[existingItemIndex].aantal += newItem.aantal;
    } else {
      updatedWinkelkar.push(newItem);
    }
  
    console.log("Updated winkelkar:", updatedWinkelkar); 
  
    setWinkelkar(updatedWinkelkar);
    setAantal(0);
  };
   

  const handleEuroDollarToggle = async () => {
    const newCurrency = currency === 'EUR' ? 'USD' : 'EUR';
    setCurrency(newCurrency);

    if (newCurrency === 'USD') {
      const rate = await getExchangeRate('EUR', 'USD');
      setExchangeRate(rate);
    } else {
      setExchangeRate(1);
    }
  };
  
  const handleAantalChange = (e) => {
    const value = e.target.value;
    const floatValue = parseFloat(value);
  
    if (value === "" || floatValue >= 0) {
      setAantal(floatValue || 0);
      const isDecimal = floatValue % 1 !== 0;
      const isKg = selectedGroenten?.eenheid === "kg";
      setIsInvalid(isDecimal && !isKg);
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
          <GroentenSelect onSelect={(groente) => {
            setSelectedGroenten(groente);
            setAantal(0);
          }} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label className="form-label mb-0">Hoeveel moet je hebben?</label>
        </div>
        <div className="col-9 position-relative">
          <input
            type="number"
            className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
            value={aantal}
            onChange={handleAantalChange}
            placeholder="Aantal"
            min="0"
            step="any"
          />
          {isInvalid && (
            <small className="text-danger position-absolute" style={{ top: "100%", left: 0 }}>
              Decimalen zijn enkel toegelaten bij kg aub.
            </small>
          )}
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleBestel}
        disabled={!selectedWinkel || !selectedGroenten || aantal <= 0 || isInvalid}
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