import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import generateDateRange from '../utils/helpers';

type FiltersState = {
  selectedCurrencies: string[];
  startDate: string;
  endDate: string;
  dateRange: string[];
};

const initialState: FiltersState = {
  selectedCurrencies: [],
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
  dateRange: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedCurrencies: (state, action: PayloadAction<string[]>) => {
      state.selectedCurrencies = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
      state.dateRange = generateDateRange(action.payload, state.endDate);
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
      state.dateRange = generateDateRange(state.startDate, action.payload);
    },
    setDateRange: (state, action: PayloadAction<string[]>) => {
      state.dateRange = action.payload;
    },
  },
});

export const { setSelectedCurrencies, setStartDate, setEndDate, setDateRange } =
  filtersSlice.actions;

export default filtersSlice.reducer;
