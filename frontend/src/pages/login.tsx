import { useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { setCookies } from "cookies-next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Input from "../components/materials/Inputs";
import { client } from "../utils/api";

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
  const [isLoading, setLoading] = useState(false);

  const { push } = useRouter();
  const { t } = useTranslation("footer");
  const { t: tt } = useTranslation("header");
  const { t: ttt } = useTranslation("login-registration");
  const { handleSubmit, register } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(inputs: LoginForm) {
    setLoading(true);
    try {
      const { data } = await client.post("/users/login", { ...inputs });
      setCookies("currentUser", JSON.stringify(data));
      setLoading(false);
      push("/");
    } catch (error) {
      setLoading(false);
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
                {isLoading && (
                  <svg
                    role="status"
                    className="inline w-5 h-5 mr-2 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
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
