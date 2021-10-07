import Head from "next/head";
import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import LoaderPage from "../components/head/LoaderPage";
import { DefaultSeo } from "next-seo";
const PublicLayout = (props) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width"
        />
      </Head>
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
      <div className="container">
        <Header {...props} />
        <div className="row">
          <div
            className="col-md-12"
            style={{ paddingRight: 0, paddingLeft: 0 }}
          >
            <LoaderPage />
            {props.children}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default PublicLayout;
