import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setSelectedCurrencies,
  setStartDate,
  setEndDate,
} from '../../store/filtersSlice';
import styles from './Filters.module.scss';

const Filters = (): ReactElement => {
  const { selectedCurrencies, startDate, endDate } = useSelector(
    (state: RootState) => state.filters
  );
  const dispatch = useDispatch();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedCurrencies: string[];

    if (checked) {
      updatedCurrencies = [...selectedCurrencies, value.toLowerCase()];
    } else {
      updatedCurrencies = selectedCurrencies.filter(
        (currency) => currency !== value.toLowerCase()
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
    <div className={styles.filters}>
      <h4 className={styles.filters__title}>Filters:</h4>
      <div className={styles.filters__currencies}>
        <input
          className={styles.filters__checkbox}
          type='checkbox'
          value='EUR'
          onChange={handleCurrencyChange}
          id='eur'
        />
        <label className={styles.filters__label} htmlFor='eur'>
          EUR
        </label>
        <input
          className={styles.filters__checkbox}
          type='checkbox'
          value='USD'
          onChange={handleCurrencyChange}
          id='usd'
        />
        <label className={styles.filters__label} htmlFor='usd'>
          USD
        </label>
        <input
          className={styles.filters__checkbox}
          type='checkbox'
          value='CNY'
          onChange={handleCurrencyChange}
          id='cny'
        />
        <label className={styles.filters__label} htmlFor='cny'>
          CNY
        </label>
      </div>
      <div className={styles.filters__dates}>
        <label className={styles.filters__label} htmlFor='startDate'>
          From:{' '}
        </label>
        <input
          className={styles.filters__date}
          type='date'
          id='startDate'
          name='startDate'
          value={startDate}
          onChange={handleStartDateChange}
        />
        <label className={styles.filters__label} htmlFor='endDate'>
          To:{' '}
        </label>
        <input
          className={styles.filters__date}
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
