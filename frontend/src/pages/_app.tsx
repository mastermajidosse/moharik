import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router, useRouter } from "next/router";
import { done, start } from "nprogress";
import TypesafeI18n from "../i18n/i18n-react";
import { Locales } from "../i18n/i18n-types";
// import "nprogress/nprogress.css";

function MyApp({ Component, pageProps }: any) {
  Router.events.on("routeChangeStart", () => start());
  Router.events.on("routeChangeComplete", () => done());
  Router.events.on("routeChangeError", () => done());
  const { locale } = useRouter();
  console.log("locale: ", locale);

  return (
    <>
      <TypesafeI18n locale={(locale as Locales) || "en"}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </TypesafeI18n>
    </>
  );
}

export default MyApp;
