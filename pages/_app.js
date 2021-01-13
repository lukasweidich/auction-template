import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DefaultSEO from "../components/meta/DefaultSEO";
import AutoSelectLanguageFromCookies from "../components/meta/AutoSelectLanguageFromCookies";
import "../i18n";
import "../styles/globals.css";
import "../node_modules/antd/dist/antd.css";
import "../node_modules/flag-icon-css/css/flag-icon.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";

import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import store from "../store";
import { BackTop } from "antd";
import CookieConsentModal from "../components/misc/CookieConsentModal";

const MyApp = ({ Component, pageProps, locale }) => {
  return (
    <Provider {...{ store }}>
      <AutoSelectLanguageFromCookies {...{ locale }} />
      <DefaultSEO />
      <Header />
      <main style={{ overflow: "hidden" }}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </main>
      <Footer />
      <BackTop />
      <CookieConsentModal />
    </Provider>
  );
};

export async function getStaticProps(context) {
  const { locale } = context;
  return {
    revalidate: 1,
    props: { locale },
  };
}

export default MyApp;
