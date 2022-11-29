/* eslint-disable no-console */
/* eslint-disable default-param-last */

import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      const query = action.payload;
      return query;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
