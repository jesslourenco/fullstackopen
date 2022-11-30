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

export const notify = (message, seconds) => async (dispatch) => {
  const ms = seconds * 1000;

  await dispatch(setMessage(message));
  setTimeout(() => {
    dispatch(clearMessage());
  }, ms);
};
export default notificationSlice.reducer;
