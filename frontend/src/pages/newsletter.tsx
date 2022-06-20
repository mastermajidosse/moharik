import clsx from "clsx";
import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const NewsLetterPage: NextPage = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("newsletter");
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      newsLetter: "",
    },
  });

  function onSubmit() {
    toast.success("You are now subscribed to our newsletter.");
    reset();
  }

  return (
    <>
      <Head>
        <title>Moharik | Newsletter</title>
      </Head>
      {/* newsletter */}
      <section className="mt-20 bg-light container pb-8">
        <div
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 76%)" }}
          className="h-64 bg-gradient-to-t flex justify-center items-center from-primary-700/60 to-primary-500"
        >
          <h1 className="text-3xl md:text-5xl font-black text-white">
            {t("moharik_newsletter")}
          </h1>
        </div>
        <figure className="block md:hidden relative h-64 overflow-hidden">
          <img
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 76%)" }}
            className="h-full w-full object-cover"
            src="https://s3-eu-west-1.amazonaws.com/com.ulule.assets/site/build/img/newsletter/newsletter-1@2x.84917bf5e0b2.jpg"
            alt=""
          />
          <div
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 76%)" }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary-700/60"
          />
        </figure>
        <div className="grid grid-cols-7">
          <div
            className={clsx(
              "md:pl-8 bg-light md:bg-white col-span-full md:col-span-5 flex flex-col justify-center gap-4",
              {
                "md:pl-0 md:pr-8": locale === "ar",
              }
            )}
          >
            <div className="">
              <h2 className="text-2xl font-black text-dark">
                {t("newsletter_title")}
              </h2>
              <p className="text-lightDark font-medium text-sm">
                {t("newsletter_subtitle")}
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative w-full flex flex-col md:flex-row justify-center items-center gap-3"
            >
              <input
                className="w-full md:w-3/4 outline-none border-2 border-primary-200 focus:border-primary-300 p-2.5 md:p-3 bg-light"
                placeholder={t("newsletter_email_palceholder")}
                type="email"
                {...register("newsLetter")}
              />
              <button
                type="submit"
                className="w-full md:w-1/4 flex justify-center items-center bg-primary-500 text-light font-medium  py-1.5 md:py-3 hover:bg-primary-600 duration-200 text-lg"
              >
                {t("subscribe")}
              </button>
            </form>
            <p className="text-lightDark font-medium text-xs">
              {t("newsletter_desc")}
            </p>
          </div>
          <figure className="bg-light md:bg-white col-span-2 md:block hidden relative h-64 overflow-hidden">
            <img
              style={{
                clipPath: "polygon(36% 0, 100% 0, 100% 100%, 0 100%)",
              }}
              className={clsx("h-full w-full object-cover", {
                "rotate-180 -scale-y-100": locale === "ar",
              })}
              src="https://s3-eu-west-1.amazonaws.com/com.ulule.assets/site/build/img/newsletter/newsletter-1@2x.84917bf5e0b2.jpg"
              alt=""
            />
            <div
              style={{
                clipPath: "polygon(36% 0, 100% 0, 100% 100%, 0 100%)",
              }}
              className={clsx(
                "absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary-700/60",
                {
                  "rotate-180 -scale-y-100": locale === "ar",
                }
              )}
            />
          </figure>
        </div>
      </section>
    </>
  );
};

export default NewsLetterPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "newsletter",
        "footer",
        "header",
      ])),
    },
  };
};
