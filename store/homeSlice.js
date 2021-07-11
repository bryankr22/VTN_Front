import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        marcas: [],
        categories: [],
        noticias: [],
        banners: [],
        bannersMobile: [],
        vehiculos_promocion: [],
    },
    reducers: {
        updateHome(state, action) {
            state.noticias = action.payload.noticias
            state.categories = action.payload.categories
            state.marcas = action.payload.marcas
            state.banners = action.payload.banners
            state.bannersMobile = action.payload.bannersMobile
            state.vehiculos_promocion = action.payload.vehiculos_promocion
        }
    },
})
export const { 
    updateHome
} = homeSlice.actions
export default homeSlice.reducer