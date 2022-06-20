import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { client } from "../utils/api";
import Input from "../components/materials/Inputs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
}

const schema = yup
  .object({
    firstName: yup.string().max(16).required(),
    lastName: yup.string().max(16).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().min(8).required(),
  })
  .required();

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const { push } = useRouter();
  const { t } = useTranslation("footer");
  const { t: tt } = useTranslation("header");
  const { t: ttt } = useTranslation("login-registration");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  async function onSubmit(inputs: RegisterForm) {
    const { confirmPassword, email, firstName, lastName, password } = inputs;
    try {
      if (confirmPassword !== password) {
        toast.error("Password didn't matched!!!", {
          position: "top-right",
        });
        return;
      }

      const data = {
        name: `${firstName} ${lastName}`,
        email,
        password,
        country: "Morocco",
      };
      await client.post("/users/register", data);
      toast.success("You can now Login!!!", {
        position: "top-right",
      });
      push("/login");
    } catch (error) {
      toast.error("Something went wrong!!!", {
        position: "top-right",
      });
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Moharik | Register</title>
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
            <span className="hidden md:inline">Do have an account? </span>
            <Link href="/login">
              <a className="text-primary-500 hover:underline ">
                {tt("sign_in")}
              </a>
            </Link>
          </div>
        </div>
      </header>
      {/* main */}
      <section className="w-full min-h-screen bg-light flex justify-center items-center py-10">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full h-full flex flex-col items-center mt-8">
            {/* header */}
            <div className="flex flex-col gap-2 pt-10 pb-14">
              <h1 className="text-3xl font-black text-primary text-center">
                {tt("sign_up")}
              </h1>
            </div>
            {/* form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-3/4 mx-auto flex flex-col gap-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="">
                  <Input
                    name="firstName"
                    register={register}
                    error={errors.firstName?.message}
                    required
                    label={ttt("first_name")}
                    type="text"
                    className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                  />
                </div>
                <div className="">
                  <Input
                    required
                    name="lastName"
                    register={register}
                    label={ttt("last_name")}
                    type="text"
                    error={errors.lastName?.message}
                    className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                  />
                </div>
              </div>
              <div className="">
                <Input
                  name="email"
                  register={register}
                  label={ttt("email")}
                  error={errors.email?.message}
                  type="email"
                  required
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="">
                  <Input
                    name="password"
                    register={register}
                    label={ttt("password")}
                    required
                    error={errors.password?.message}
                    type="password"
                    className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                  />
                </div>
                <div className="">
                  <Input
                    name="confirmPassword"
                    register={register}
                    label={ttt("confirm_password")}
                    type="password"
                    required
                    error={errors.password?.message}
                    className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-fit mx-auto py-2 px-6 rounded-[0.25rem] bg-primary-500 text-white shadow-md shadow-lightDark/20 hover:bg-primary-600 duration-300 my-4"
              >
                {tt("sign_up")}
              </button>
              <p className="text-lightDark text-center">
                {ttt("have_account")}
                <span className="text-primary hover:underline cursor-pointer">
                  {" "}
                  <Link href="/login">
                    <a className="">{tt("sign_in")}</a>
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
