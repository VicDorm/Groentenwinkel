const Winkelkar = ({ items, currency, exchangeRate }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.aantal * item.prijs, 0);
  };

  return (
    <div>
      <h3>Winkelkar</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.groente} - {item.aantal} x {item.prijs} {currency} = {(item.aantal * item.prijs * exchangeRate).toFixed(2)} {currency}
          </li>
        ))}
      </ul>
      <h4>Totaal: {(calculateTotal() * exchangeRate).toFixed(2)} {currency}</h4>
    </div>
  );
};

export default Winkelkar; // Ensure this is present