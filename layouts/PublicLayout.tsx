import Head from "next/head";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import LoaderPage from "../components/head/LoaderPage";
import lodable from '@loadable/component';
const CssBaseline = lodable(() => import('@nextui-org/react').then(({CssBaseline}) => CssBaseline ))

interface Props {
  nextUi?: boolean;
  [key: string]: any;
}

const PublicLayout = ({ nextUi, ...props }: Props) => {
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
