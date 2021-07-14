//import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/components/reset.min.css'
import 'semantic-ui-css/components/dropdown.min.css'
import 'semantic-ui-css/components/input.min.css'
import 'semantic-ui-css/components/icon.min.css'
import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/container.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/header.min.css'
import 'semantic-ui-css/components/list.min.css'
import 'semantic-ui-css/components/segment.min.css'
import 'semantic-ui-css/components/form.min.css'
import 'semantic-ui-css/components/divider.min.css'
import 'semantic-ui-css/components/card.min.css'
import 'semantic-ui-css/components/image.min.css'
import 'semantic-ui-css/components/checkbox.min.css'
import 'semantic-ui-css/components/transition.min.css'
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
