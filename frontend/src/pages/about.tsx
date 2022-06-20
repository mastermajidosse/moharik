import Head from "next/head";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export default function AboutPage() {
  const { t } = useTranslation("about");
  return (
    <div className="container mt-10 py-16 md:py-24">
      <Head>
        <title>Moharik | About</title>
      </Head>
      <section className="">
        <h1 className="text-2xl md:text-3xl text-dark font-bold mb-6 text-center">
          {t("about_moharik")}
        </h1>
        <p className="w-full md:w-9/10 mx-auto text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide text-center">
          {t("about_desc_1")}
        </p>
      </section>
      {/* pic section */}
      <section className="my-8 md:my-16 w-full md:w-2/3 mx-auto">
        <figure className="relative rounded-md overflow-hidden">
          <img src="/assets/images/about.jpg" alt="about moharik" />
        </figure>
      </section>
      <p className="w-full md:w-9/10 mx-auto text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide text-center">
        {t("about_desc_2")}
      </p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "about",
        "footer",
        "header",
      ])),
    },
  };
};
