import { DefaultSeo } from "next-seo";
import Document, { Html, Main, Head, NextScript } from "next/document";
import { getLangFromReq } from "../helpers/fromReq";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const lang = getLangFromReq(ctx.req);
    return { ...initialProps, lang };
    }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
          <link
            media="screen"
            href="https://fonts.googleapis.com/css?family=Raleway:100,600&display=swap"
            rel="stylesheet"
            type="text/css"
          />
          <link
            media="screen"
            href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="Spanish" />
          <meta name="revisit-after" content="1 days" />
          <meta name="author" content="VTN - VendeTuNave" />
          <meta httpEquiv="cache-control" content="no-cache" />
          <meta name="Rating" content="General" />
          <meta name="Language" content="es" />
          <meta name="distribution" content="Global" />
          <meta name="Copyright" content="VendeTuNave" />
          <meta name="Classification" content="" />
          <meta name="zipcode" content="760001" />
          <meta name="city" content="Cali" />
          <meta name="country" content="Colombia" />
          <meta name="robots" content="NOODP" />

          <script defer src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
          <script defer src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
          <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
          <script defer src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"></script>
          <script defer src="https://cdn.jsdelivr.net/npm/ez-plus-extended@1.0.2/src/jquery.ez-plus.min.js"></script>
          {process?.env?.NODE_ENV != "development" && (
            <>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-158787289-1"
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'UA-158787289-1');
                        `,
                }}
              ></script>
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
