export const getRatesBasedOnTimeFrame = async (
  baseCurrency,
  exchangeCurrency,
  inputAmount,
  selectedTimeFrame,
) => {
  const currentDate = new Date();
  const startDate = new Date();

  switch (selectedTimeFrame) {
    case '1D':
      startDate.setDate(currentDate.getDate() - 1);
      break;
    case '1M':
      startDate.setMonth(currentDate.getMonth() - 1);
      break;
    case '3M':
      startDate.setMonth(currentDate.getMonth() - 3);
      break;
    case '1Y':
      startDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    case '5Y':
      startDate.setFullYear(currentDate.getFullYear() - 5);
      break;
    default:
      break;
  }

  const response = await fetch(
    `https://api.exchangerate.host/timeseries?start_date=${startDate.toISOString()}&end_date=${currentDate.toISOString()}&base=${baseCurrency}&symbols=${exchangeCurrency}&amount=${inputAmount}`,
  );

  const json = await response.json();
  const items = Object.entries(json.rates).reduce((acc, [key, value]) => {
    acc.push(value[exchangeCurrency]);
    return acc;
  }, []);

  return items;
};

export const getCurrencies = setCurrencies => {
  fetch('https://api.frankfurter.app/currencies')
    .then(response => response.json())
    .then(json => {
      const items = Object.entries(json).map(key => {
        return {label: String(key[0]), value: String(key[0])};
      });
      setCurrencies(items);
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

export const GetRate = (
  inputAmount,
  baseCurrency,
  exchangeCurrency,
  setConvertedAmount,
) => {
  fetch(
    `https://api.frankfurter.app/latest?amount=${inputAmount}&from=${baseCurrency}&to=${exchangeCurrency}`,
  )
    .then(response => response.json())
    .then(data => {
      setConvertedAmount(data.rates[exchangeCurrency]);
    })
    .catch(error => {
      console.error(error);
    });
};

export const getRates = (
  baseCurrency,
  exchangeCurrency,
  convertedAmount,
  setRatesTimeSeries,
) => {
  fetch(
    `https://api.exchangerate.host/timeseries?start_date=2020-01-01&end_date=2021-01-04&base=${baseCurrency}&symbols=${exchangeCurrency}&amount=${convertedAmount}`,
  )
    .then(response => response.json())
    .then(json => {
      const items = Object.entries(json.rates).reduce((acc, [key, value]) => {
        if (Math.random() > 0.5) {
          acc.push(value[exchangeCurrency]);
        }
        return acc;
      }, []);
      setRatesTimeSeries(items);
      return items;
    })
    .catch(error => {
      console.error(error);
    });
};
