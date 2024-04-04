import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RootState } from '../../store/store';

type TCachedDataItem = {
  date: string;
} & {
  [currency: string]: number;
};

type TChartProps = {
  data: TCachedDataItem[];
};

const Chart = ({ data }: TChartProps): ReactElement => {
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

  return (
    <div>
      <p>Chart</p>
      <LineChart
        width={800}
        height={500}
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
