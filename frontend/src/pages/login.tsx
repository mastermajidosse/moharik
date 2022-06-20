import Input from "../components/materials/Inputs";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { client } from "../utils/api";
import { toast } from "react-toastify";
import { setCookies } from "cookies-next";
import Head from "next/head";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface LoginForm {
  email: string;
  password: string;
}
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

export default function LoginPage() {
  const { push } = useRouter();
  const { t } = useTranslation("footer");
  const { t: tt } = useTranslation("header");
  const { t: ttt } = useTranslation("login-registration");
  const { handleSubmit, register } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(inputs: LoginForm) {
    try {
      const { data } = await client.post("/users/login", { ...inputs });
      setCookies("currentUser", JSON.stringify(data));
      push("/");
    } catch (error) {
      toast.error("Email or Password are inccorect, please try again.", {
        position: "top-right",
      });
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Moharik | Login</title>
      </Head>
      {/* header */}
      <header className="fixed top-0 left-0 z-10 w-full h-[60px] bg-white flex items-center shadow-header-light">
        <div className="flex justify-between items-center container">
          <figure className="">
            <Link href="/">
              <a className="text-xl font-bold text-primary-500">Moharik</a>
            </Link>
          </figure>
          <div className="text-dark">
            <span className="hidden md:inline">{ttt("no_account")} </span>
            <Link href="/register">
              <a className="text-primary-500 hover:underline ">
                {tt("sign_up")}
              </a>
            </Link>
          </div>
        </div>
      </header>
      {/* main */}
      <section className="w-full min-h-screen bg-light flex justify-center items-center py-20">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full h-full flex flex-col items-center">
            {/* header */}
            <div className="flex flex-col gap-2 pt-7 pb-14">
              <h1 className="text-3xl font-black text-primary text-center">
                {tt("sign_in")}
              </h1>
            </div>
            {/* form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-3/4 mx-auto flex flex-col gap-6"
            >
              <div className="">
                <Input
                  name="email"
                  register={register}
                  label={ttt("email")}
                  type="email"
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                />
              </div>
              <div className="">
                <Input
                  name="password"
                  register={register}
                  label={ttt("password")}
                  type="password"
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                />
              </div>
              <a className="text-lightDark hover:text-primary-300 text-sm font-medium w-full hover:underline cursor-pointer text-right">
                {ttt("forgot_password")}
              </a>
              <button
                type="submit"
                className="w-full hover:bg-primary-600 bg-primary-500 text-light font-medium text-lg p-2.5"
              >
                {tt("sign_in")}
              </button>
              <p className="text-lightDark text-center">
                {ttt("no_account")}
                <span className="text-primary hover:underline cursor-pointer">
                  {" "}
                  <Link href="/register">
                    <a className="">{tt("sign_up")}</a>
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
      {/* footer */}
      <div className="w-3/4 mx-auto border-t border-lightDark/20 text-center text-sm flex items-center justify-between py-4">
        <p className="font-medium text-lightDark">© 2022 Moharik</p>
        <ul className="flex items-center gap-4">
          <li className="">
            <Link href="">
              <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                {t("terms")}
              </a>
            </Link>
          </li>
          <li className="">
            <Link href="">
              <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                {t("privacy")}
              </a>
            </Link>
          </li>
          <li className="">
            <Link href="">
              <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                {t("legal")}
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "login-registration",
        "footer",
        "header",
      ])),
    },
  };
};
