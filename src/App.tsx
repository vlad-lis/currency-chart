import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Chart from './components/Chart/Chart';
import Filters from './components/Filters/Filters';
import { RootState } from './store/store';
import fetchCurrencyRatios from './utils/api';

function App() {
  const { dateRange, selectedCurrencies } = useSelector(
    (state: RootState) => state.filters
  );
  const [apiCallCounter, setApiCallCounter] = useState(0);

  useEffect(() => {
    const getChartData = async () => {
      if (selectedCurrencies.length > 0 && dateRange.length > 0) {
        dateRange.forEach(async (date) => {
          selectedCurrencies.forEach(async (currency) => {
            try {
              const res = await fetchCurrencyRatios(date, currency);
              console.log(currency, date, res.data?.[currency]?.rub);
              setApiCallCounter((prevCount) => prevCount + 1);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          });
        });
      }
    };

    getChartData();
  }, [dateRange, selectedCurrencies]);

  return (
    <div>
      <p>Currency Page</p>
      <p>Total API Calls: {apiCallCounter}</p>
      <Filters />
      <Chart />
    </div>
  );
}

export default App;
