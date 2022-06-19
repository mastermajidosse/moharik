import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ProjectCard from "../components/cards/ProjectCard";
import { SquaredSolidButton } from "../components/materials/Buttons";
import { IProject } from "../interfaces/project";
import { client } from "../utils/api";
import { IMoto } from "../interfaces/motos";
import { blogs } from "../data/blogs";
import BlogCard from "../components/cards/BlogCard";
import { motos } from "../data/motos";
import { getCurrentUser } from "../utils/getCurrentUser";

export default function HomePage({
  projects,
}: // motos,
{
  projects: IProject[];
  // motos: IMoto[];
}) {
  const [counter, setCounter] = useState(0);
  const [moto, setMoto] = useState<string>(motos[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoto(motos[counter] || "");
      counter >= motos.length - 1 ? setCounter(0) : setCounter(counter + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [counter]);

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
        <title>Moharik</title>
      </Head>
      <div className="mt-16 py-16 md:py-24 bg-light">
        {/* hero */}
        <section className="bg-light mb-8">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 h-auto md:h-full flex flex-col justify-center gap-4">
              <h1 className="text-4xl font-black text-dark h-24 capitalize">
                {moto}
              </h1>
              <Link href={getCurrentUser() ? "/projects/create" : "/login"}>
                <SquaredSolidButton className="md:w-fit md:block mt-0 py-1 md:py-2 px-6 rounded-[0.25rem] border-primary-500 border-[2px] text-primary shadow-md shadow-lightDark/20 hover:bg-primary-50 duration-300">
                  <a className="text-center font-bold tracking-wide leading-relaxed text-lg">
                    Get started
                  </a>
                </SquaredSolidButton>
              </Link>
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
              <p className="w-full md:w-2/4 md:mx-auto text-lightDark mt-8">
                Here you will find the most popular projects from our creators
                and dreamers, take a look and explore them.
              </p>
            </div>
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
              {projects
                .slice(0, 3)
                .map(
                  (
                    {
                      _id,
                      category,
                      deadline,
                      price,
                      title,
                      createdAt,
                      images,
                      collected,
                    },
                    idx
                  ) => (
                    <ProjectCard
                      key={idx}
                      category={category}
                      title={title}
                      createdAt={createdAt}
                      id={_id}
                      price={price}
                      deadline={deadline}
                      images={images}
                      collected={collected}
                    />
                  )
                )}
            </div>
          </div>
        </section>
        {/* ideas */}
        <section className="bg-light py-12">
          <div className="container">
            <div className="mb-14 text-center">
              <h1 className="text-4xl font-black text-dark capitalize">
                Explore our blogs
              </h1>
              <p className="w-full md:w-2/4 md:mx-auto text-lightDark mt-8">
                Looking for inspiration? Here you find wild of creative ideas
                from our creators and dreamers that promote thinking and
                problem-solving.
              </p>
            </div>
            {/*  */}
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
              {blogs.slice(0, 3).map((blog, idx) => (
                <BlogCard key={idx} idx={idx} {...blog} />
              ))}
            </div>
            <div className="w-fit mx-auto">
              <Link href="/blog">
                <a className="px-6 py-2 border-secondary border text-lg font-medium text-secondary hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-600 duration-200 rounded-md">
                  Explore more
                </a>
              </Link>
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
                Here you will find the most recent projects from our creators
                and dreamers, <br /> take a look and explore them.
              </p>
            </div>
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
              {projects
                .slice(0, 6)
                .map(
                  (
                    {
                      _id,
                      category,
                      deadline,
                      price,
                      title,
                      createdAt,
                      images,
                      desc,
                      collected,
                    },
                    idx
                  ) => (
                    <ProjectCard
                      key={idx}
                      category={category}
                      desc={desc}
                      title={title}
                      createdAt={createdAt}
                      id={_id}
                      price={price}
                      deadline={deadline}
                      images={images}
                      collected={collected}
                    />
                  )
                )}
            </div>
            <div className="w-fit mx-auto">
              <Link href="/projects">
                <a className="px-6 py-2 border-secondary border text-lg font-medium text-secondary hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-600 duration-200 rounded-md">
                  Show more
                </a>
              </Link>
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
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  let projects: IProject[] = [];
  let motos: IMoto[] = [];
  try {
    const { data: motosData } = await client.get("/motos");
    const { data } = await client.get("/posts");
    projects = data;
    motos = motosData;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      projects,
      motos,
      ...(await serverSideTranslations(locale as string, [
        "commonm",
        "footer",
        "header",
      ])),
    },
  };
};
