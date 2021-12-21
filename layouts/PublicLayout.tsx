import Head from "next/head";

import Header from "../components/header/Header";

import LoaderPage from "../components/head/LoaderPage";
import lodable from "@loadable/component";
import dayjs from "dayjs";
import { useEffect } from "react";
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

const PublicLayout = ({ nextUi, ...props }: Props) => {
  useEffect(() => {
    //TODO: remove this when the date is over
    const maxDate = dayjs("2021-11-28").unix();
    const minDate = dayjs().unix();
    if (minDate > maxDate) {
      document.querySelectorAll(".new-tag")?.forEach((el) => {
        el.remove();
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width"
        />
        {nextUi && <CssBaseline />}
      </Head>
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
