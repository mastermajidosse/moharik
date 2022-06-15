import "../styles/globals.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router, useRouter } from "next/router";
import { done, start } from "nprogress";
import Layout from "../components/layout/Layout";
import TypesafeI18n from "../i18n/i18n-react";
import { Locales } from "../i18n/i18n-types";
import * as ga from "../lib/ga";

function MyApp({ Component, pageProps }: any) {
  const { locale, events } = useRouter();

  Router.events.on("routeChangeStart", () => start());
  Router.events.on("routeChangeComplete", () => done());
  Router.events.on("routeChangeError", () => done());

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      events.off("routeChangeComplete", handleRouteChange);
    };
  }, [events]);

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
