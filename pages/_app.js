import 'semantic-ui-css/components/reset.min.css'
import 'semantic-ui-css/components/site.min.css'
import 'semantic-ui-css/components/dropdown.min.css'
import 'semantic-ui-css/components/item.min.css'
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
import 'semantic-ui-css/components/label.min.css'
import 'semantic-ui-css/components/menu.min.css'

import 'semantic-ui-css/components/dimmer.min.css'
import 'semantic-ui-css/components/loader.min.css'

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
