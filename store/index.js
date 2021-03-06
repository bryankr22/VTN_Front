import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import homeSlice from './homeSlice';
import comparadorSlice from './comparadorSlice';
import authSlice from './authSlice';
import productoSlice from './productoSlice';
import accesorioSlice from './accesorioSlice';
import darkMode from './darkMode';

const reducers = combineReducers({
    home: homeSlice,
    comparador: comparadorSlice,
    auth: authSlice,
    producto: productoSlice,
    accesorio: accesorioSlice,
    darkMode
});
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});
export default store;