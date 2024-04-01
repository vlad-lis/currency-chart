import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Filters = (): ReactElement => {
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.filters
  );

  return (
    <div>
      <p>Filters</p>
      <div>
        <input type='checkbox' value='EUR' /> EUR
        <input type='checkbox' value='USD' /> USD
        <input type='checkbox' value='CNY' /> CNY
      </div>
      <div>
        <label htmlFor='startDate'>From:</label>
        <input type='date' id='startDate' name='startDate' value={startDate} />
        <label htmlFor='endDate'>To:</label>
        <input type='date' id='endDate' name='endDate' value={endDate} />
      </div>
    </div>
  );
};

export default Filters;
