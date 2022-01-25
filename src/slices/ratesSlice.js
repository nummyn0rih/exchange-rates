import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const fetchRates = createAsyncThunk('rates/fetchRates', async () => {
  const response = await axios.get(routes.cbrPath());
  return response.data;
});

const initialState = {
  currencies: {
    response: '',
    base: {},
    entities: {},
    ids: [],
  },
};

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    exchange: (state, { payload: { text } }) => {
      state.currencies = { ...state.currencies, response: text };
    },
    changeBase: (state, { payload: { value } }) => {
      if (value === state.currancy.base) {
        return;
      }

      const factor = state.currencies.entities[value].rate;
      const updated = state.currencies.ids.map((id) => {
        const currancy = { ...state.currencies.entities[id] };
      });
      state.currencies = { ...state.currencies, base: value };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, () => {})
      .addCase(fetchRates.fulfilled, (state, { payload }) => {
        //
        //перенести логику в декоратор
        //
        const base = {
          id: 'RUB',
          currancy: 'RUB',
          name: 'Российский рубль',
          nominal: 1,
          rate: 1,
          previousRate: 1,
          code: 1,
        };
        const ids = [...Object.keys(payload.Valute), base.id];
        const entities = ids.reduce(
          (acc, id) => {
            const currency = { ...payload.Valute[id] };
            return {
              ...acc,
              [id]: {
                id,
                currancy: currency.CharCode,
                name: currency.Name,
                nominal: currency.Nominal,
                rate: currency.Value,
                previousRate: currency.Previous,
                code: currency.NumCode,
              },
            };
          },
          { [base.id]: base }
        );

        state.currencies = { base, entities, ids };
      });
  },
});

export const { exchange, changeBase } = ratesSlice.actions;

export default ratesSlice.reducer;
