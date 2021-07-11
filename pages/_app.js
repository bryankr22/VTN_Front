import 'semantic-ui-css/semantic.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../public/css/app.min.css'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store';
import React from 'react';
function MyApp({ Component, pageProps }) {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
export default MyApp
