import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setSelectedCurrencies,
  setStartDate,
  setEndDate,
} from '../../store/filtersSlice';

const Filters = (): ReactElement => {
  const { selectedCurrencies, startDate, endDate } = useSelector(
    (state: RootState) => state.filters
  );
  const dispatch = useDispatch();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedCurrencies: string[];

    if (checked) {
      updatedCurrencies = [...selectedCurrencies, value];
    } else {
      updatedCurrencies = selectedCurrencies.filter(
        (currency) => currency !== value
      );
    }

    dispatch(setSelectedCurrencies(updatedCurrencies));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStartDate(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndDate(e.target.value));
  };

  return (
    <div>
      <p>Filters</p>
      <div>
        <input type='checkbox' value='EUR' onChange={handleCurrencyChange} />{' '}
        EUR
        <input
          type='checkbox'
          value='USD'
          onChange={handleCurrencyChange}
        />{' '}
        USD
        <input
          type='checkbox'
          value='CNY'
          onChange={handleCurrencyChange}
        />{' '}
        CNY
      </div>
      <div>
        <label htmlFor='startDate'>From:</label>
        <input
          type='date'
          id='startDate'
          name='startDate'
          value={startDate}
          onChange={handleStartDateChange}
        />
        <label htmlFor='endDate'>To:</label>
        <input
          type='date'
          id='endDate'
          name='endDate'
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default Filters;
