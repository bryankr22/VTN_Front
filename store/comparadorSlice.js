import { createSlice } from '@reduxjs/toolkit';

const comparadorSlice = createSlice({
    name: 'comparador',
    initialState: {
        vehiculos: [],
        fichas: [],
    },
    reducers: {
        addFicha(state, action) {
            state.fichas.push(action.payload);
        },
        removeFicha(state, action) {
            state.fichas = [...state.fichas.slice(0, action.payload), ...state.fichas.slice(action.payload + 1)]
        },
        restartFicha(state, action) {
            state.fichas = [];
        },
        addVehiculo(state, action) {
            state.vehiculos.push(action.payload);
        },
        removeVehiculo(state, action){
            state.vehiculos = [...state.vehiculos.slice(0, action.payload), ...state.vehiculos.slice(action.payload + 1)]
        },
        restartVehiculo(state, action){
            state.vehiculos = [];
        }
    },
})
export const { 
    addFicha, addVehiculo, removeFicha, removeVehiculo, restartFicha, restartVehiculo
} = comparadorSlice.actions
export default comparadorSlice.reducer