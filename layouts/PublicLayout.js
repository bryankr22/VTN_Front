import Head from 'next/head'
import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


const PublicLayout = (props) => {
    return(
        <>
            <Head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width" />
                <title>VendeTuNave - Carros en Venta</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link media="all" href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet" />
                <script media="all" defer src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script media="all" defer src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
                <script media="all" defer src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
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
