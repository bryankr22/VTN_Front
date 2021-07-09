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
                <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css" />
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <link href="/css/app.min.css?v=2.11" rel="stylesheet" />
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
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
