import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RootState } from '../../store/store';
import Loader from '../Loader/Loader';
import styles from './Chart.module.scss';

type TCachedDataItem = {
  date: string;
} & {
  [currency: string]: number;
};

type TChartProps = {
  data: TCachedDataItem[];
  isLoading: boolean;
};

const Chart = ({ data, isLoading }: TChartProps): ReactElement => {
  console.log(data);
  const { selectedCurrencies } = useSelector(
    (state: RootState) => state.filters
  );

  const getStrokeColor = (currency: string): string => {
    switch (currency) {
      case 'usd':
        return '#FF0000';
      case 'eur':
        return '#00CC00';
      case 'cny':
        return '#800080';
      default:
        return '#000000';
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.chart}>
      <LineChart
        width={700}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey='date' tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        {selectedCurrencies.map((currency, index) => {
          return (
            <Line
              key={index}
              type='monotone'
              dataKey={currency}
              stroke={getStrokeColor(currency)}
            />
          );
        })}
      </LineChart>
    </div>
  );
};

export default Chart;
