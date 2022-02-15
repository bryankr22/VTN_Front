import { createSlice } from '@reduxjs/toolkit';
import { dark, light } from '../helpers/colors';

const darkMode = createSlice({
    name: 'darkMode',
    initialState: {
        status: light,
    },
    reducers: {
        changeMode(state, action) {
            state.status = action.payload
        }
    },
})
export const {
    changeMode
} = darkMode.actions
export default darkMode.reducer