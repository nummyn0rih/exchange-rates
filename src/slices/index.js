import { configureStore } from '@reduxjs/toolkit';
import ratesReducer from './ratesSlice.js';

export default configureStore({
  reducer: {
    rates: ratesReducer,
  },
});
