import type { NextPage } from "next";
import { SearchIcon } from "../components/materials/Icons";

const Home: NextPage = () => {
  return (
    <>
      <div className="mt-20 py-16 md:py-24 bg-light">
        <section className="container min-h-screen py-8">
          <h1 className="font-fr text-primary font-black text-3xl">
            Hello world!
          </h1>
        </section>
      </div>
      {/* newsletter */}
      <section className="pb-8 md:p-0 bg-light">
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
        <div className="container grid grid-cols-7">
          <div className="md:pl-8 bg-light md:bg-white col-span-full md:col-span-5 flex flex-col justify-center gap-4">
            <div className="">
              <h2 className="text-2xl font-black text-dark">
                Subscribe to our newsletter
              </h2>
              <p className="text-lightDark font-medium text-sm">
                Get 3 great projects in your box every week!
              </p>
            </div>
            <div className="relative w-full flex flex-col md:flex-row justify-center items-center gap-3">
              <input
                className="w-full md:w-3/4 outline-none border-2 border-primary-200 focus:border-primary-300 p-2.5 md:p-3 bg-light"
                placeholder="Eneter your email adress"
              />
              <button className="w-full md:w-1/4 flex justify-center items-center bg-primary-500 text-light font-medium  py-1.5 md:py-3 hover:bg-primary-600 duration-200 text-lg">
                Subscribe
              </button>
            </div>
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
      <div className="w-full h-screen bg-red-100" />
    </>
  );
};

export default Home;
