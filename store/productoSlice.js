import { createSlice } from '@reduxjs/toolkit';

const productoSlice = createSlice({
    name: 'producto',
    initialState: {
        images: [],
        vehiculo: {
            tipo_vehiculo: 0,
            marca: 0,
            tipo_moto: 0,
            modelo: 0,
            anio: 0
        },
        imagesAcc: []
    },
    reducers: {
        addImage(state, action) {
            state.images[action.payload.index] = action.payload.image;
        },
        removeImage(state, action){
            state.images = [...state.images.slice(0, action.payload), ...state.images.slice(action.payload + 1)];
        },
        addImageAcc(state, action) {
            state.imagesAcc[action.payload.index] = action.payload.image;
        },
        updateVehiculo(state, action) {
            state.vehiculo[action.payload.input] = action.payload.value;
        },
    },
})
export const { 
    addImage, addImageAcc, removeImage, updateVehiculo
} = productoSlice.actions
export default productoSlice.reducer