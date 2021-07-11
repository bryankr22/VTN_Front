import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getLangFromReq } from '../helpers/fromReq'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        const lang = getLangFromReq(ctx.req)
        return { ...initialProps, lang }
    }

    render() {
        return (
            <Html lang={this.props.lang}>
                <Head>
                    <meta name="Description" content="VendeTuNave"></meta>
                    <meta name="theme-color" content="#317EFB" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="manifest" href="/manifest.json" />
                    <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
                    <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
                    <link rel="preload" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" as="style" onload="this.onLoad=null;this.rel='stylesheet'" />
                    <noscript>
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                    </noscript>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument