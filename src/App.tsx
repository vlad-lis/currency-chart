import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Chart from './components/Chart/Chart';
import Filters from './components/Filters/Filters';
import { RootState } from './store/store';
import fetchCurrencyRatios from './utils/api';

type TCachedDataItem = {
  date: string;
} & {
  [currency: string]: number | undefined;
};

function App() {
  const { dateRange, selectedCurrencies } = useSelector(
    (state: RootState) => state.filters
  );
  const [apiCallCounter, setApiCallCounter] = useState(0);
  const [currentChartData, setCurrentChartData] = useState([]);

  useEffect(() => {
    const getChartData = async () => {
      if (selectedCurrencies.length > 0 && dateRange.length > 0) {
        const cachedData = JSON.parse(
          sessionStorage.getItem('cachedData') || '[]'
        );

        for (const date of dateRange) {
          for (const currency of selectedCurrencies) {
            const existingDataIndex = cachedData.findIndex(
              (item: TCachedDataItem) => item.date === date
            );

            // check if date in cache
            if (
              existingDataIndex !== -1 &&
              cachedData[existingDataIndex][currency]
            ) {
              // continue if ratio on date already cached
              continue;
            }

            try {
              const res = await fetchCurrencyRatios(date, currency);
              setApiCallCounter((prevCount) => prevCount + 1);

              if (
                existingDataIndex !== -1 &&
                !cachedData[existingDataIndex][currency]
              ) {
                // if date cached, add currency to cached data
                cachedData[existingDataIndex][currency] =
                  res.data?.[currency]?.rub;
              } else {
                // if date not cached, add new object to cached data
                cachedData.push({
                  date,
                  [currency]: res.data?.[currency]?.rub,
                });
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
        }

        sessionStorage.setItem('cachedData', JSON.stringify(cachedData));
        const filteredData = cachedData.filter((item: TCachedDataItem) =>
          dateRange.includes(item.date)
        );
        filteredData.sort(
          (a: TCachedDataItem, b: TCachedDataItem) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setCurrentChartData(filteredData);
      }
    };

    setCurrentChartData([]);
    getChartData();
  }, [dateRange, selectedCurrencies]);

  return (
    <div>
      <p>Currency Page</p>
      <p>Total API Calls: {apiCallCounter}</p>
      <Filters />
      <Chart data={currentChartData} />
    </div>
  );
}

export default App;
