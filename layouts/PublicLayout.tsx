import Head from "next/head";
import { Button, Responsive } from "semantic-ui-react";
import { useSelector, useDispatch } from 'react-redux';
import Header from "../components/header/Header";

import LoaderPage from "../components/head/LoaderPage";
import lodable from "@loadable/component";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { changeMode, initialMode } from "../store/darkMode";
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
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["accept_cookies"]);
  const [acceptCookies, setAcceptCookies] = useState(false);
  const [darkModeBody, setDarkMode] = useState(light);

  const darkMode = useSelector(({ darkMode }: any) => darkMode.status);
  const colorText = darkMode === light ? dark : light;

  useEffect(() => {
    //TODO: remove this when the date is over
    dispatch(initialMode());
    const darkModeStorage = localStorage.getItem("darkMode");
    if (darkModeStorage === null || darkModeStorage === light) {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : light);
      dispatch(changeMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : light));
    } else {
      setDarkMode(darkModeStorage);
    }
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

  const statusMode = darkMode === dark ? light : dark;
  const buttonText = darkMode === dark ? 'claro' : 'oscuro';
  const buttonColor = darkMode === dark ? light : '#484848';
  const buttonMargin = darkMode === dark ? '-130px' : '-142px';

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
          body {
            background-color: ${darkModeBody}
          }
          .container-cookie {
            margin: 0px !important
          }
        `}
      </style>
      <style>
        {`
          html {
            background-color: ${darkMode}
          }
          #dark-mode-button:hover {
            right: -5px !important;
            transition: width 1s ease 0s, right 0.8s ease 0s;
          }
          .label-buttons {
            font-size: 0.9rem !important;
            color: ${darkMode === dark ? dark : light} !important;
          }
        `}
      </style>
      <div className="container">
        <Header {...props} />


        <Responsive {...Responsive.onlyMobile}>
          <Button.Group
            vertical
            labeled
            icon
            style={{
              position: 'fixed',
              right: buttonMargin,
              zIndex: 10,
              cursor: 'pointer',
              top: '30%'
            }}
          >
            <Button
              onClick={() => dispatch(changeMode(statusMode))}
              className="label-buttons"
              size='small'
              icon='adjust'
              content={`modo ${buttonText}`}
              style={{ backgroundColor: buttonColor, fontFamily: "Montserrat", textTransform: "uppercase" }}
            />
          </Button.Group>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <Button.Group
            vertical
            labeled
            icon
            style={{
              position: 'fixed',
              right: buttonMargin,
              zIndex: 10,
              cursor: 'pointer',
              top: '30%'
            }}
          >
            <Button
              onClick={() => dispatch(changeMode(statusMode))}
              className="label-buttons"
              size='small'
              icon='adjust'
              content={`modo ${buttonText}`}
              style={{ backgroundColor: buttonColor, fontFamily: "Montserrat", textTransform: "uppercase" }}
            />
          </Button.Group>
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <Button.Group
            id="dark-mode-button"
            vertical
            labeled
            icon
            style={{
              position: 'fixed',
              right: buttonMargin,
              zIndex: 10,
              cursor: 'pointer',
              top: '30%'
            }}
          >
            <Button
              onClick={() => dispatch(changeMode(statusMode))}
              size='small'
              className="label-buttons"
              icon='adjust'
              content={`modo ${buttonText}`}
              style={{ backgroundColor: buttonColor, fontFamily: "Montserrat", textTransform: "uppercase" }}
            />
          </Button.Group>
        </Responsive>

        <div className="row">
          <div
            className="col-md-12"
            style={{ paddingRight: 0, paddingLeft: 0, backgroundColor: darkMode }}
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
