const Winkelkar = ({ items, currency, exchangeRate }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.aantal * item.prijs, 0);
  };

  return (
    <div>
      <h3>Winkelkar</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Winkel</th>
            <th>Groente</th>
            <th>Aantal</th>
            <th>Prijs ({currency})</th>
            <th>Subtotaal ({currency})</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.winkel}</td>
              <td>{item.groenten}</td>
              <td>{item.aantal}</td>
              <td>{(item.prijs * exchangeRate).toFixed(2)}</td>
              <td>{(item.aantal * item.prijs * exchangeRate).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Totaal:</strong></td>
            <td><strong>{(calculateTotal() * exchangeRate).toFixed(2)} {currency}</strong></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Winkelkar;