import 'semantic-ui-css/semantic.min.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../public/css/app.min.css'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
export default MyApp
