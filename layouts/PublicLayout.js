import Head from 'next/head'
import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const PublicLayout = (props) => {
    return(
        <>
            <Head>
                <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width" />
                <title>VendeTuNave - Carros en Venta</title>
            </Head>
            <div className="container">
                <Header />
                <div className="row">
                    <div
                    className="col-md-12"
                    style={{ paddingRight: 0, paddingLeft: 0 }}
                    >
                        {props.children}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default PublicLayout;
