import Input from "../components/materials/Inputs";

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
        <div className="w-1/2 h-full rounded-md bg-white shadow-xl shadow-lightDark/20 flex flex-col">
          <h1 className="text-4xl font-black text-dark text-center p-8 border-b border-lightDark/20">
            PROJECT_NAME
          </h1>
          {/* form */}
          <div className="w-3/4 flex-1 mx-auto flex flex-col gap-4 py-14">
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
            <a className="text-primary hover:underline cursor-pointer">
              Forgot your password?
            </a>
            <p className="text-lightDark">
              Don&#39;t have an account?
              <span className="text-primary hover:underline cursor-pointer">
                Sign up
              </span>
            </p>
          </div>
          {/* footer */}
          <div className="p-4 border-t border-lightDark/20 text-center"></div>
        </div>
      </section>
    </>
  );
}
