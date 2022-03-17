import { createSlice } from '@reduxjs/toolkit';
import { light } from '../helpers/colors';


const darkMode = createSlice({
    name: 'darkMode',
    initialState: {
        status: light,
    },
    reducers: {
        initialMode(state) {
            const darkModeStorage = localStorage.getItem("darkMode");
            state.status = darkModeStorage === null ? light : darkModeStorage;
        },
        changeMode(state, action) {
            state.status = action.payload;
            localStorage.setItem("darkMode", action.payload);
        }
    },
})
export const {
    initialMode,
    changeMode
} = darkMode.actions
export default darkMode.reducer