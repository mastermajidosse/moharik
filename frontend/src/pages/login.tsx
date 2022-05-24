import Input from "../components/materials/Inputs";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <section className="w-full h-screen bg-light flex justify-center items-center">
        <figure className="w-1/2 h-full">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1643321613132-040da599025b?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480"
            alt=""
          />
        </figure>
        <div className="w-1/2 h-screen bg-white flex flex-col items-center">
          <div className="w-full h-full pt-16 flex flex-col justify-between items-center">
            {/* header */}
            <div className="flex flex-col gap-2 mt-10">
              <h1 className="text-3xl font-black text-primary text-center">
                PROJECT_NAME
              </h1>
              <h2 className="text-xl font-black text-dark text-center">
                Sign in
              </h2>
            </div>
            {/* form */}
            <div className="w-3/4  mx-auto flex flex-col gap-6 py-14">
              <div className="">
                <Input label="Email" type="email" />
              </div>
              <div className="">
                <Input label="Password" type="password" />
              </div>
              <a className="text-primary hover:underline cursor-pointer text-center">
                Forgot your password?
              </a>
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
          </div>
        </div>
      </section>
    </>
  );
}
