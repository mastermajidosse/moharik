import "../styles/globals.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router, useRouter } from "next/router";
import { done, start } from "nprogress";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/layout/Layout";
import * as ga from "../lib/ga";
import { NextSeo } from "next-seo";
import { defaultSEO } from "../utils/default-seo.config";

function MyApp({ Component, pageProps }: any) {
  const { locale, events, asPath } = useRouter();

  Router.events.on("routeChangeStart", () => start());
  Router.events.on("routeChangeComplete", () => done());
  Router.events.on("routeChangeError", () => done());

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    events.on("routeChangeComplete", handleRouteChange);
    return () => {
      events.off("routeChangeComplete", handleRouteChange);
    };
  }, [events]);

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <Layout>
        <NextSeo
          canonical={`https://www.moharik.ma${asPath}`}
          {...defaultSEO}
        />
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </div>
  );
}

export default appWithTranslation(MyApp);
