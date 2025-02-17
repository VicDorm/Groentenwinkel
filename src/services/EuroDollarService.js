import axios from "axios";

export const getExchangeRate = async (base = "EUR", target = "USD") => {
  try {
    const response = await axios.get(`https://open.er-api.com/v6/latest/${base}`);
    const rate = response.data.rates[target];
    return rate || 1; // als de API niet werkt
  } catch (error) {
    console.error("Failed to fetch exchange rate:", error);
    return 1;
  }
};

export const convertCurrency = async (amount, fromCurrency = "EUR", toCurrency = "USD") => {
  const rate = await getExchangeRate(fromCurrency, toCurrency);
  return (amount * rate).toFixed(2);
};