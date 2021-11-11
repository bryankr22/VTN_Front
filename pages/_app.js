//import '../styles/header.css'
import "../public/css/app.min.css";
import "../styles/globals.css";
import '../styles/normalize.css'
import "./../components/ExpCarousel/dist/index.css";


import { Provider as ProviderRedux } from "react-redux";
import store from "../store";
import { CookiesProvider } from "react-cookie";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Fragment } from "react";
import { DefaultSeo } from 'next-seo';

let persistor = persistStore(store);
function MyApp({ Component, pageProps }) {
  const Gate = process.browser ? PersistGate : Fragment;
  return (
    <>
      <DefaultSeo
        title="VendeTuNave - Carros en Venta"
        defaultOpenGraphImageHeight={200}
        defaultOpenGraphImageWidth={150}
        description="Vende tu vehículo completamente gratis en VendeTuNave. Encuentra carros, camionetas, motos, servicios y recomendaciones en un solo sitio."
        openGraph={{
          type: "website",
          locale: "es_ES",
          url: "https://vendetunave.co",
          site_name: "VendeTuNave",
          title: "VendeTuNave",
          images: [
            {
              url: "https://vendetunave.co/images/logo_VTN.png",
              height: 200,
              width: 150,
            },
          ],
        }}
      />
      <CookiesProvider>
        <ProviderRedux store={store}>
          <Gate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </Gate>
        </ProviderRedux>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
