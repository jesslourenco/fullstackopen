import loginService from '../services/login';
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {},
    reducers: {
        setUsername(state, action){
            state.username = action.payload;
        },
        setPassword(state, action){
            state.password = action.payload;
        },
    }
});

export const { setPassword, setUsername } = loginSlice.actions;

export const userAuth = (credentials) => { return async () => {
    await loginService.login(credentials)
}};

export default loginSlice.reducer;
