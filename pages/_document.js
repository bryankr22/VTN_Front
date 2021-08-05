import Document, { Html, Head, Main } from 'next/document'
import { getLangFromReq } from '../helpers/fromReq'
import NextScriptCustom from '../components/head/NextScriptCustom';
import HeadCustom from '../components/head/HeadCustom';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        const lang = getLangFromReq(ctx.req)
        return { ...initialProps, lang }
    }

    render() {
        return (
            <Html lang={this.props.lang}>
                <HeadCustom>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="Description" content="VendeTuNave"></meta>
                    <meta name="theme-color" content="#317EFB" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="manifest" href="/manifest.json" />
                    <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
                    <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                    <link media="all" href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css" />
                    <link media="all" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" rel="stylesheet" type="text/css" />
                    <script media="all" defer src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                    <script media="all" defer src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
                    <script media="all" defer src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
                    <script media="all" defer src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"></script>
                </HeadCustom>
                <body>
                    <Main />
                    <NextScriptCustom />
                </body>
            </Html>
        )
    }
}

export default MyDocument