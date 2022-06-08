import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Home: NextPage = () => {
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
      <section className="mt-20 bg-light container">
        <div
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 76%)" }}
          className="h-64 bg-gradient-to-t flex justify-center items-center from-primary-700/60 to-primary-500"
        >
          <h1 className="text-3xl md:text-5xl font-black text-white">
            Moharik Newsletter
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
          <div className="md:pl-8 bg-light md:bg-white col-span-full md:col-span-5 flex flex-col justify-center gap-4">
            <div className="">
              <h2 className="text-2xl font-black text-dark">
                Subscribe to our newsletter
              </h2>
              <p className="text-lightDark font-medium text-sm">
                Receive new projects in your inbox every week!
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative w-full flex flex-col md:flex-row justify-center items-center gap-3"
            >
              <input
                className="w-full md:w-3/4 outline-none border-2 border-primary-200 focus:border-primary-300 p-2.5 md:p-3 bg-light"
                placeholder="Eneter your email adress"
                type="email"
                {...register("newsLetter")}
              />
              <button
                type="submit"
                className="w-full md:w-1/4 flex justify-center items-center bg-primary-500 text-light font-medium  py-1.5 md:py-3 hover:bg-primary-600 duration-200 text-lg"
              >
                Subscribe
              </button>
            </form>
            <p className="text-lightDark font-medium text-xs">
              We will only use your email address to send you our newsletter.
              Learn more
            </p>
          </div>
          <figure className="bg-light md:bg-white col-span-2 md:block hidden relative h-64 overflow-hidden">
            <img
              style={{ clipPath: "polygon(36% 0, 100% 0, 100% 100%, 0 100%)" }}
              className="h-full w-full object-cover"
              src="https://s3-eu-west-1.amazonaws.com/com.ulule.assets/site/build/img/newsletter/newsletter-1@2x.84917bf5e0b2.jpg"
              alt=""
            />
            <div
              style={{ clipPath: "polygon(36% 0, 100% 0, 100% 100%, 0 100%)" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary-700/60"
            />
          </figure>
        </div>
      </section>
    </>
  );
};

export default Home;
