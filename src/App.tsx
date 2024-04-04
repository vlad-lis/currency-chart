import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Chart from './components/Chart/Chart';
import Filters from './components/Filters/Filters';
import { RootState } from './store/store';
import fetchCurrencyRatios from './utils/api';
import Header from './components/Header/Header';
import ApiCounter from './components/ApiCounter/ApiCounter';

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
  const [isChartDisplayed, setIsChartDisplayed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getChartData = async () => {
      setIsChartDisplayed(false);

      if (selectedCurrencies.length > 0 && dateRange.length > 0) {
        setIsChartDisplayed(true);
        setIsLoading(true);
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

        // save to session storage and filter
        sessionStorage.setItem('cachedData', JSON.stringify(cachedData));
        const filteredData = cachedData.filter((item: TCachedDataItem) =>
          dateRange.includes(item.date)
        );
        filteredData.sort(
          (a: TCachedDataItem, b: TCachedDataItem) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setCurrentChartData(filteredData);
        setIsLoading(false);
      }
    };

    setCurrentChartData([]);
    getChartData();
  }, [dateRange, selectedCurrencies]);

  return (
    <>
      <Header />
      <main>
        <Filters />
        <ApiCounter counter={apiCallCounter} />
        {!isChartDisplayed ? null : (
          <Chart data={currentChartData} isLoading={isLoading} />
        )}
      </main>
    </>
  );
}

export default App;
