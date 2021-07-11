import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        marcas: [],
        categories: [],
        noticias: [],
        banners: [],
        bannersMobile: [],
        vehiculos_promocion:[
            {
               "id":9498,
               "title":"Ford festiva",
               "precio":4000000,
               "nameImage":"60cab39ebbca7",
               "extension":"jpeg",
               "new_image":2
            },
            {
               "id":9498,
               "title":"Ford festiva",
               "precio":4000000,
               "nameImage":"60cab39f4badc",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9498,
               "title":"Ford festiva",
               "precio":4000000,
               "nameImage":"60cab39f9e91e",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9498,
               "title":"Ford festiva",
               "precio":4000000,
               "nameImage":"60cab3a003ea1",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9498,
               "title":"Ford festiva",
               "precio":4000000,
               "nameImage":"60cab3a061bb1",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9480,
               "title":"Spark GT 2015",
               "precio":23500000,
               "nameImage":"60ca3cd1a6aa1",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9480,
               "title":"Spark GT 2015",
               "precio":23500000,
               "nameImage":"60ca3cd25e227",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9480,
               "title":"Spark GT 2015",
               "precio":23500000,
               "nameImage":"60ca3cce9a5ec",
               "extension":"jpeg",
               "new_image":2
            },
            {
               "id":9480,
               "title":"Spark GT 2015",
               "precio":23500000,
               "nameImage":"60ca3ccfdda90",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9480,
               "title":"Spark GT 2015",
               "precio":23500000,
               "nameImage":"60ca3cd0ad7df",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9480,
               "title":"Spark GT 2015",
               "precio":23500000,
               "nameImage":"60ca3cd14180b",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9457,
               "title":"2011 Chevrolet Cruze Platinum Automatico",
               "precio":22900000,
               "nameImage":"60c81236a465f",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9457,
               "title":"2011 Chevrolet Cruze Platinum Automatico",
               "precio":22900000,
               "nameImage":"60c8123703ef0",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9457,
               "title":"2011 Chevrolet Cruze Platinum Automatico",
               "precio":22900000,
               "nameImage":"60c8123783d49",
               "extension":"jpeg",
               "new_image":1
            },
            {
               "id":9457,
               "title":"2011 Chevrolet Cruze Platinum Automatico",
               "precio":22900000,
               "nameImage":"60c81237e637b",
               "extension":"jpeg",
               "new_image":1
            }
        ],
    },
    reducers: {
        updateHome(state, action) {
            state.noticias = action.payload.noticias
            state.categories = action.payload.categories
            state.marcas = action.payload.marcas
            state.banners = action.payload.banners
            state.bannersMobile = action.payload.bannersMobile
            //state.vehiculos_promocion = action.payload.vehiculos_promocion
        }
    },
})
export const { 
    updateHome
} = homeSlice.actions
export default homeSlice.reducer