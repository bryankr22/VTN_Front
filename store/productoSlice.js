import { createSlice } from '@reduxjs/toolkit';

const productoSlice = createSlice({
    name: 'producto',
    initialState: {
        images: [],
        vehiculo: {
            anio: "",
            blindado_vehiculo: "",
            cilindraje_vehiculo: "",
            ciudad_vehiculo: "",
            color_vehiculo: "",
            combustible_vehiculo: "",
            contacto_vehiculo: "",
            departamento_vehiculo: "",
            descripcion_vehiculo: "",
            estado_vehiculo: "",
            financiacion: false,
            kilometraje_vehiculo: "",
            marca: "",
            modelo: "",
            permuta: false,
            placa_vehiculo: "",
            precio_vehiculo: "",
            promocion: false,
            tipo_precio_vehiculo: "",
            titulo_vehiculo: "",
            tipo_vehiculo: 0,
            tipo_moto: 0,

        },
        imagesAcc: []
    },
    reducers: {
        addImage(state, action) {
            state.images[action.payload.index] = action.payload.image;
        },
        removeImage(state, action) {
            state.images = [...state.images.slice(0, action.payload), ...state.images.slice(action.payload + 1)];
        },
        addImageAcc(state, action) {
            state.imagesAcc[action.payload.index] = action.payload.image;
        },
        updateVehiculo(state, action) {
            state.vehiculo[action.payload.input] = action.payload.value;
        },
        clearForm(state, action) {
            state.vehiculo = {
                anio: "",
                blindado_vehiculo: "",
                cilindraje_vehiculo: "",
                ciudad_vehiculo: "",
                color_vehiculo: "",
                combustible_vehiculo: "",
                contacto_vehiculo: "",
                departamento_vehiculo: "",
                descripcion_vehiculo: "",
                estado_vehiculo: "",
                financiacion: false,
                kilometraje_vehiculo: "",
                marca: "",
                modelo: "",
                permuta: false,
                placa_vehiculo: "",
                precio_vehiculo: "",
                promocion: false,
                tipo_precio_vehiculo: "",
                titulo_vehiculo: "",
                tipo_vehiculo: 0,
                tipo_moto: 0,
            };
            state.images = []
        }
    },
})
export const {
    addImage, addImageAcc, removeImage, updateVehiculo, clearForm
} = productoSlice.actions
export default productoSlice.reducer