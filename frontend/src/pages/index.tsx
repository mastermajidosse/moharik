import type { NextPage } from "next";
import ProjectCard from "../components/cards/ProjectCard";
import { SquaredSolidButton } from "../components/materials/Buttons";

const Home: NextPage = () => {
  return (
    <>
      <div className="mt-16 py-16 md:py-24 bg-light">
        {/* hero */}
        <section className="bg-light mb-8">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 h-auto md:h-full flex flex-col justify-center gap-4">
              <h1 className="text-4xl font-black text-dark">
                A place for friends, charities, dreamers, & you
              </h1>
              <SquaredSolidButton className="md:w-fit md:block mt-0 py-1 md:py-2 px-6 rounded-[0.25rem] border-primary-500 border-[2px] text-primary shadow-md shadow-lightDark/20 hover:bg-primary-50 duration-300">
                <span className="text-center font-bold tracking-wide leading-relaxed text-lg">
                  Get started
                </span>
              </SquaredSolidButton>
            </div>
            <figure className="md:col-span-8 md:h-[400px]">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src="https://images.gofundme.com/nXZQjDEdnDuHrY96dXs1D6v7jp8=/720x405/https://d2g8igdw686xgo.cloudfront.net/64550899_1649356998460419_r.jpeg"
                alt=""
              />
            </figure>
          </div>
        </section>
        {/* popular */}
        <section className="bg-white py-12">
          <div className="container">
            <div className="mb-14 text-center">
              <h1 className="text-4xl font-black text-dark">
                What&#39;s Popular
              </h1>
              <p className="w-full md:w-3/4 md:mx-auto text-lightDark mt-8">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
                dignissimos accusantium accusamus ut voluptatum iste modi
                perferendis facere suscipit vero.
              </p>
            </div>
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
              {Array.from(Array(3)).map((_, idx) => (
                <ProjectCard key={idx} />
              ))}
            </div>
          </div>
        </section>
        {/* ideas */}
        <section className="bg-light py-12">
          <div className="container">
            <div className="mb-14 text-center">
              <h1 className="text-4xl font-black text-dark">Explore Ideas</h1>
              <p className="w-full md:w-3/5 md:mx-auto text-lightDark mt-8">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
                dignissimos accusantium accusamus ut voluptatum.
              </p>
            </div>
            {/*  */}
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
              {Array.from(Array(9)).map((_, idx) => (
                <div
                  key={idx}
                  className="group w-full h-60 relative cursor-pointer overflow-hidden"
                >
                  <figure className="w-full h-full relative">
                    <img
                      className="object-cover w-full h-full group-hover:scale-110 duration-1000"
                      src="https://images.gofundme.com/Ze4tfG6FGkyofzNALx2PDeXkOjI=/720x405/https://d2g8igdw686xgo.cloudfront.net/63751373_1646644799776323_r.png"
                    />
                    <div className="absolute z-0 top-0 left-0 w-full h-full bg-gradient-to-t from-primary-900 opacity-80" />
                  </figure>
                  <div className="absolute bottom-0 left-0 flex flex-col justify-center items-center w-full text-light p-8">
                    <p className="text-xl font-bold ">Design & Art</p>
                    <div className="w-3/5 h-0.5 rounded-full bg-light group-hover:translate-x-0 duration-300 -translate-x-16 opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* compaigns */}
        <section className="bg-white py-12">
          <div className="container">
            <div className="mb-14 text-center">
              <h2 className="text-4xl font-black text-dark">
                Latest Campaigns
              </h2>
              <p className="w-full md:w-3/4 md:mx-auto text-lightDark mt-8">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
                dignissimos accusantium accusamus ut voluptatum iste modi
                perferendis facere suscipit vero.
              </p>
            </div>
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
              {Array.from(Array(9)).map((_, idx) => (
                <ProjectCard key={idx} />
              ))}
            </div>
            <div className="w-fit mx-auto">
              <button className="px-6 py-2 border-secondary border text-lg font-medium text-secondary hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-600 duration-200 rounded-md">
                Show more
              </button>
            </div>
          </div>
        </section>
        {/* newsletter */}
        <section className="mt-16 pb-8 md:p-0 bg-light">
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
                style={{
                  clipPath: "polygon(36% 0, 100% 0, 100% 100%, 0 100%)",
                }}
                className="h-full w-full object-cover"
                src="https://s3-eu-west-1.amazonaws.com/com.ulule.assets/site/build/img/newsletter/newsletter-1@2x.84917bf5e0b2.jpg"
                alt=""
              />
              <div
                style={{
                  clipPath: "polygon(36% 0, 100% 0, 100% 100%, 0 100%)",
                }}
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary-700/60"
              />
            </figure>
          </div>
        </section>
        {/* <div className="h-0 md:h-20 bg-light" /> */}
      </div>
    </>
  );
};

export default Home;
