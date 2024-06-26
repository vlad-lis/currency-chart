import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
