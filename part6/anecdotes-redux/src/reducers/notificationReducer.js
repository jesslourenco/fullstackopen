import { createSlice } from '@reduxjs/toolkit';

const initialState = 'this is a notification';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showMessage(state, action) {
      const message = action.payload;
      return message;
    },
  },
});

export const { showMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
