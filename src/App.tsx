import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Chart from './components/Chart/Chart';
import Filters from './components/Filters/Filters';
import { RootState } from './store/store';
import fetchCurrencyRatios from './utils/api';

function App() {
  const { dateRange, selectedCurrencies } = useSelector(
    (state: RootState) => state.filters
  );

  useEffect(() => {
    const getChartData = async () => {
      if (selectedCurrencies.length > 0 && dateRange.length > 0) {
        dateRange.forEach(async (date) => {
          selectedCurrencies.forEach(async (currency) => {
            const res = await fetchCurrencyRatios(date, currency);
            console.log(currency, date, res.data?.[currency]?.rub);
          });
        });
      }
    };

    getChartData();
  }, [dateRange, selectedCurrencies]);

  return (
    <div>
      <p>Currency Page</p>
      <Filters />
      <Chart />
    </div>
  );
}

export default App;
