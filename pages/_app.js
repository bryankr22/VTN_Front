//import '../styles/header.css'
import '../public/css/app.min.css'
import '../styles/globals.css'

import { Provider as ProviderRedux} from 'react-redux'
import store from '../store';
import { CookiesProvider } from "react-cookie"

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
    return (
        <CookiesProvider>
            <ProviderRedux store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </ProviderRedux>
        </CookiesProvider>
    );
}

export default MyApp
