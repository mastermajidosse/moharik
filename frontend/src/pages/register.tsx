import Link from "next/link";
import Input from "../components/materials/Inputs";

export default function RegisterPage() {
  return (
    <>
      <section className="w-full h-screen bg-light flex justify-center items-center">
        <figure className="w-1/2 h-full">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1604881991720-f91add269bed?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480"
            alt=""
          />
        </figure>
        <div className="w-1/2 h-screen bg-white flex flex-col items-center">
          <div className="w-full h-full pt-16 flex flex-col justify-between items-center">
            {/* header */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black text-primary text-center">
                PROJECT_NAME
              </h1>
              <h2 className="text-xl font-black text-dark text-center">
                Sign up
              </h2>
            </div>
            {/* form */}
            <div className="w-3/4 mx-auto flex flex-col gap-4 py-14">
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <Input label="First name" type="text" />
                </div>
                <div className="">
                  <Input label="Last name" type="text" />
                </div>
              </div>
              <div className="">
                <Input label="Email" type="email" />
              </div>
              <div className="">
                <Input label="Password" type="password" />
              </div>
              <button className="w-fit mx-auto py-2 px-6 rounded-[0.25rem] bg-primary-500 text-white shadow-md shadow-lightDark/20 hover:bg-primary-600 duration-300 my-4">
                Next
              </button>
              <p className="text-lightDark text-center">
                Already have an account?
                <span className="text-primary hover:underline cursor-pointer">
                  {" "}
                  <Link href="/login">
                    <a className="">Sign in</a>
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
