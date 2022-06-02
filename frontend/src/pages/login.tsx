import Input from "../components/materials/Inputs";
import Link from "next/link";

export default function LoginPage() {
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
      <section className="w-full h-screen bg-light flex justify-center items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full h-full flex flex-col items-center">
            {/* header */}
            <div className="flex flex-col gap-2 pt-7 pb-14">
              <h1 className="text-3xl font-black text-primary text-center">
                Sign in
              </h1>
            </div>
            {/* form */}
            <div className="w-3/4 mx-auto flex flex-col gap-6">
              <div className="">
                <Input
                  label="Username or email address"
                  type="text"
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                />
              </div>
              <div className="">
                <Input
                  label="Password"
                  type="password"
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                />
              </div>
              <a className="text-lightDark hover:text-primary-300 text-sm font-medium w-full hover:underline cursor-pointer text-right">
                Forgot your password?
              </a>
              <button className="w-full hover:bg-primary-600 bg-primary-500 text-light font-medium text-lg p-2.5">
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
            </div>
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
