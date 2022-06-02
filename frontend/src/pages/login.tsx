import Input from "../components/materials/Inputs";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { client } from "../utils/api";
import { toast } from "react-toastify";

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
  const { handleSubmit, register } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(inputs: LoginForm) {
    try {
      console.log(inputs);
      await client.post("/users/login", { ...inputs });
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
      {/* header */}
      <header className="fixed top-0 left-0 z-10 w-full h-[60px] bg-white flex items-center shadow-header-light">
        <div className="flex justify-between items-center container">
          <figure className="">
            <h1 className="text-xl font-bold text-primary-500">Moharik</h1>
          </figure>
          <div className="text-dark">
            <span className="hidden md:inline">
              Don&#39;t have an account?{" "}
            </span>
            <Link href="/register">
              <a className="text-primary-500 hover:underline ">Sign up</a>
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
                Sign in
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
                  label="Email address"
                  type="email"
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                />
              </div>
              <div className="">
                <Input
                  name="password"
                  register={register}
                  label="Password"
                  type="password"
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                />
              </div>
              <a className="text-lightDark hover:text-primary-300 text-sm font-medium w-full hover:underline cursor-pointer text-right">
                Forgot your password?
              </a>
              <button
                type="submit"
                className="w-full hover:bg-primary-600 bg-primary-500 text-light font-medium text-lg p-2.5"
              >
                Log in
              </button>
              <p className="text-lightDark text-center">
                Don&#39;t have an account?
                <span className="text-primary hover:underline cursor-pointer">
                  {" "}
                  <Link href="/register">
                    <a className="">Sign up</a>
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
      {/* footer */}
      <div className="w-3/4 mx-auto border-t border-lightDark/20 text-center text-sm flex items-center justify-between py-4">
        <p className="font-medium text-lightDark">© 2022 NAME_HERE</p>
        <ul className="flex items-center gap-4">
          <li className="">
            <Link href="">
              <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                Terms
              </a>
            </Link>
          </li>
          <li className="">
            <Link href="">
              <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                Privacy
              </a>
            </Link>
          </li>
          <li className="">
            <Link href="">
              <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                Legal
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
