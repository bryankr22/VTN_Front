import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/css/app.min.css'
import '../styles/globals.css'

import { Provider as ProviderRedux} from 'react-redux'
import store from '../store';
import { CookiesProvider } from "react-cookie"

function MyApp({ Component, pageProps }) {
    return (
        <CookiesProvider>
            <ProviderRedux store={store}>
                <Component {...pageProps} />
            </ProviderRedux>
        </CookiesProvider>
    );
}
export default MyApp
