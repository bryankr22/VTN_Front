import Head from "next/head";
import { Container, Button } from "semantic-ui-react";
import { useSelector } from 'react-redux';
import Header from "../components/header/Header";

import LoaderPage from "../components/head/LoaderPage";
import lodable from "@loadable/component";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { light, dark } from "../helpers/colors";

const CssBaseline = lodable(() =>
  import("@nextui-org/react").then(({ CssBaseline }) => CssBaseline)
);

const Footer = lodable(() => import("../components/footer/Footer"), {
  ssr: false,
});

interface Props {
  nextUi?: boolean;
  [key: string]: any;
}

const nextYear = () => {
  let oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  return oneYearFromNow
}

const PublicLayout = ({ nextUi, ...props }: Props) => {
  const [cookies, setCookie] = useCookies(["accept_cookies"]);
  const [acceptCookies, setAcceptCookies] = useState(false);

  const darkMode = useSelector(({ darkMode }: any) => darkMode.status);
  const colorText = darkMode === light ? dark : light;

  useEffect(() => {
    //TODO: remove this when the date is over

    const cookie = cookies.accept_cookies;
    if (cookie) setAcceptCookies(true);

    const maxDate = dayjs("2021-11-28").unix();
    const minDate = dayjs().unix();
    if (minDate > maxDate) {
      document.querySelectorAll(".new-tag")?.forEach((el) => {
        el.remove();
      });
    }
  }, []);

  const handleAcceptCookies = () => {
    setAcceptCookies(true);
    setCookie('accept_cookies', true, {
      path: "/",
      expires: nextYear(),
      sameSite: true
    });
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width"
        />
        {nextUi && <CssBaseline />}
      </Head>
      <style>
        {`
          .container-cookie {
            margin: 0px !important
          }
        `}
      </style>
      <div className="container">
        <Header {...props} />
        <div className="row">
          <div
            className="col-md-12"
            style={{ paddingRight: 0, paddingLeft: 0, backgroundColor: props.darkMode }}
          >
            <LoaderPage />
            {props.children}
          </div>
        </div>
        {!acceptCookies &&
          <div
            className="container-cookie"
            style={{
              width: '100%',
              position: 'fixed',
              bottom: 0,
              backgroundColor: colorText,
              padding: 20,
              color: darkMode,
              textAlign: 'center',
              zIndex: 4

            }}
          >
            <p style={{ display: 'contents' }}>Al navegar en este sitio aceptas las cookies que utilizamos para mejorar tu experiencia.</p>
            <Button
              primary
              compact
              style={{ marginLeft: 10, marginTop: '1em' }}
              onClick={handleAcceptCookies}
            >
              Entendido
            </Button>
          </div>
        }
        <Footer />
      </div>
    </>
  );
};
export default PublicLayout;
