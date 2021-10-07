//import '../styles/header.css'
import '../public/css/app.min.css'
import '../styles/globals.css'

import { Provider as ProviderRedux} from 'react-redux'
import store from '../store';
import { CookiesProvider } from "react-cookie"

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Fragment } from 'react';
let persistor = persistStore(store);

function MyApp({ Component, pageProps }) { 
    const Gate = process.browser ? PersistGate : Fragment;
    return (
        <CookiesProvider>
            <ProviderRedux store={store}>
                <Gate loading={null} persistor={persistor}>
                    <Component {...pageProps} />
                </Gate>
            </ProviderRedux>
        </CookiesProvider>
    );
}

export default MyApp
