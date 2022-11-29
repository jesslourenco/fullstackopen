import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      const message = action.payload;
      return message;
    },
    clearMessage() {
      return initialState;
    },

  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
