import { createSlice } from '@reduxjs/toolkit';

const accesorioSlice = createSlice({
    name: 'accesorio',
    initialState: {
        images: [],
        accesorio: {
            categoria: "",
            titulo: "",
            descripcion: "",
            estado: "",
            precio: "",
            tipo_precio: "",
            ciudad: "",
        },
    },
    reducers: {
        addImage(state, action) {
            state.images[action.payload.index] = action.payload.image;
        },
        removeImage(state, action) {
            state.images = [...state.images.slice(0, action.payload), ...state.images.slice(action.payload + 1)];
        },
        updateAccesorio(state, action) {
            state.accesorio[action.payload.input] = action.payload.value;
        },
        clearForm(state, action) {
            state.accesorio = {
                categoria: "",
                titulo: "",
                descripcion: "",
                estado: "",
                precio: "",
                tipo_precio: "",
                ciudad: "",
            };
            state.images = []
        }
    },
})
export const {
    addImage, removeImage, updateAccesorio, clearForm
} = accesorioSlice.actions
export default accesorioSlice.reducer