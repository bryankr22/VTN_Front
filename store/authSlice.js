import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        jwt_token: null
    },
    reducers: {
        updateToken(state, action) {
            state.jwt_token = action.payload;
        }
    },
})
export const { 
    updateToken
} = authSlice.actions
export default authSlice.reducer