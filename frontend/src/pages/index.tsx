import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import ProjectCard from "../components/cards/ProjectCard";
import { SquaredSolidButton } from "../components/materials/Buttons";
import { IProject } from "../interfaces/project";
import { client } from "../utils/api";
import { IMoto } from "../interfaces/motos";
import { blogs } from "../data/blogs";
import { IEvent } from "../interfaces/event";
import {IArticle} from "../interfaces/article"
import BlogCard from "../components/cards/BlogCard";
import { getCurrentUser } from "../utils/getCurrentUser";
import Motos from "../components/materials/Motos";
import { ITeam } from "../interfaces/team";
import TeamCard from "../components/cards/TeamCard";
import EventCard from "../components/cards/EventCard";

export default function HomePage({
  projects,
  teams,
  events,
  articles
}: {
  projects: IProject[];
  teams: ITeam[];
  events:IEvent[];
  articles:IArticle[];
}) {
  const { t } = useTranslation("home-page");
  const { t: tt } = useTranslation("common");
  const { t: ttt } = useTranslation("newsletter");
  const { locale } = useRouter();

  console.log("projects: ", projects);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      newsLetter: "",
    },
  });

  function onSubmit() {
    toast.success("You are now subscribed to our newsletter.");
    reset();
  }

  const ourPick = projects.filter(
    (item) => item?.status?.toLocaleLowerCase() === "picked"
  );

  return (
    <>
      <Head>
        <title>Moharik</title>
      </Head>
      <div className="mt-16 py-16 md:py-24 bg-light">
        {/* hero */}
        <section className="__hero_vh bg-light mb-8">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 h-auto md:h-full flex flex-col justify-center gap-4">
              <Motos />
              <div className="w-full flex gap-4">
                <Link
                  href={getCurrentUser() ? "/projects/create" : "/login"}
                  passHref
                >
                  <SquaredSolidButton className="w-full md:w-fit md:block mt-0 py-1 md:py-2 px-5 rounded-[0.25rem] border-link border-[2px] text-link shadow-md shadow-lightDark/20 hover:bg-link/25 duration-300">
                    <a className="text-center font-bold tracking-wide leading-relaxed text-lg">
                      {/* {tt("get_started")} */}
                      {tt("Create Project")}
                    </a>
                  </SquaredSolidButton>
                </Link>
                <Link
                  href={getCurrentUser() ? "/teams/create" : "/login"}
                  passHref
                >
                  <SquaredSolidButton className="w-full md:w-fit md:block mt-0 py-1 md:py-2 px-5 rounded-[0.25rem] border-primary-500 border-[2px] text-primary shadow-md shadow-lightDark/20 hover:bg-primary-50 duration-300">
                    <a className="text-center font-bold tracking-wide leading-relaxed text-lg">
                      {tt("Create Team")}
                    </a>
                  </SquaredSolidButton>
                </Link>
              </div>
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
        {/* our pick */}
        {ourPick.length > 0 && (
          <section className="bg-white py-12">
            <div className="container">
              <div className="mb-14 text-center">
                <h1 className="text-4xl font-black text-dark">
                  {t("Our Pick")}
                </h1>
                <p className="w-full md:w-2/4 md:mx-auto text-lightDark mt-8">
                  {t("whats_popular_desc")}
                </p>
              </div>
              <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
                {ourPick
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
                        images={images}
                        collected={collected}
                      />
                    )
                  )}
              </div>
            </div>
          </section>
        )}
        {/* popular */}
        <section className="bg-white py-12">
          <div className="container">
            <div className="mb-14 text-center">
              <h1 className="text-4xl font-black text-dark">
                {t("whats_popular")}
              </h1>
              <p className="w-full md:w-2/4 md:mx-auto text-lightDark mt-8">
                {t("whats_popular_desc")}
              </p>
            </div>
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
              {projects
                .filter((item) => item?.status?.toLocaleLowerCase() === "top")
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
                      images={images}
                      collected={collected}
                    />
                  )
                )}
            </div>
          </div>
        </section>
        
        {/* teams */}
        <section className="bg-white py-12">
          <div className="container">
            <div className="mb-14 text-center">
              <h1 className="text-4xl font-black text-dark">
                {t("popular_teams")}
              </h1>
              <p className="w-full md:w-2/4 md:mx-auto text-lightDark mt-8">
                {t("popular_teams_desc")}
              </p>
            </div>
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
              {teams
                .filter(
                  (team) => team?.status?.toLocaleLowerCase() === "approved"
                )
                .slice(0, 3)
                .map(({ _id, title, images, link, tags }, idx) => (
                  <TeamCard
                    key={idx}
                    title={title}
                    id={_id}
                    image={images[0]}
                    link={link}
                    tags={tags}
                  />
                ))}
            </div>
            <div className="w-fit mx-auto">
              <Link href="/teams">
                <a className="px-6 py-2 border-secondary border text-lg font-medium text-secondary hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-600 duration-200 rounded-md">
                  {tt("show_more")}
                </a>
              </Link>
            </div>
          </div>
        </section>
        {/* ideas */}
        <section className="bg-light py-12">
          <div className="container">
            <div className="mb-14 text-center">
              <h1 className="text-4xl font-black text-dark capitalize">
                {t("explore_our_blogs")}
              </h1>
              <p className="w-full md:w-2/4 md:mx-auto text-lightDark mt-8">
                {t("explore_our_blogs_desc")}
              </p>
            </div>
            {/*  */}
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
              {articles?.slice(0, 3).map(({_id,title,content,image}, idx) => (
                <BlogCard
                   key={idx}
                   id={_id}
                   title={title}
                   image={image}
                   content={content}
                 />
              ))}
            </div>
            <div className="w-fit mx-auto">
              <Link href="/blog">
                <a className="px-6 py-2 border-secondary border text-lg font-medium text-secondary hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-600 duration-200 rounded-md">
                  {tt("explore_more")}
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
                {t("latest_campaigns")}
              </h2>
              <p className="w-full md:w-3/4 md:mx-auto text-lightDark mt-8">
                {t("latest_campaigns_desc")}
              </p>
            </div>
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
              {projects
                .filter(
                  (item) =>
                    item?.status?.toLocaleLowerCase() === "top" ||
                    item?.status?.toLocaleLowerCase() === "approved"
                )
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
                      images={images}
                      collected={collected}
                    />
                  )
                )}
            </div>
            <div className="w-fit mx-auto">
              <Link href="/projects">
                <a className="px-6 py-2 border-secondary border text-lg font-medium text-secondary hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-600 duration-200 rounded-md">
                  {tt("show_more")}
                </a>
              </Link>
            </div>
          </div>
        </section>
        {/* Events */}
        <section className="bg-white py-12">
          <div className="container">
            <div className="mb-14 text-center">
              <h1 className="text-4xl font-black text-dark capitalize">
                {t("upcoming_events")}
              </h1>
              <p className="w-full md:w-2/4 md:mx-auto text-lightDark mt-8">
                {t("upcoming_events_desc")}
              </p>
            </div>
            {/*  */}
             <div className="flex flex-col w-full mx-auto space-y-10 bg-transparent  rounded  ">

              {events.map(({name,desc,image,link,date,_id}, idx) => (
                
                  <EventCard
                    key={idx}
                    name={name}
                    desc={desc}
                    image={image}
                    link={link}
                    date = {date}
                    id={_id}
                  />
                
              ))}
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
            <div
              className={clsx(
                "md:pl-8 bg-light md:bg-white col-span-full md:col-span-5 flex flex-col justify-center gap-4",
                {
                  "md:pl-0 md:pr-8": locale === "ar",
                }
              )}
            >
              <div className="">
                <h2 className="text-2xl font-black text-dark">
                  {ttt("newsletter_title")}
                </h2>
                <p className="text-lightDark font-medium text-sm">
                  {ttt("newsletter_subtitle")}
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative w-full flex flex-col md:flex-row justify-center items-center gap-3"
              >
                <input
                  className="w-full md:w-3/4 outline-none border-2 border-primary-200 focus:border-primary-300 p-2.5 md:p-3 bg-light"
                  placeholder={ttt("newsletter_email_palceholder")}
                  type="email"
                  {...register("newsLetter")}
                />
                <button
                  type="submit"
                  className="w-full md:w-1/4 flex justify-center items-center bg-primary-500 text-light font-medium  py-1.5 md:py-3 hover:bg-primary-600 duration-200 text-lg"
                >
                  {ttt("subscribe")}
                </button>
              </form>
              <p className="text-lightDark font-medium text-xs">
                {ttt("newsletter_desc")}
              </p>
            </div>
            <figure className="bg-light md:bg-white col-span-2 md:block hidden relative h-64 overflow-hidden">
              <img
                style={{
                  clipPath: "polygon(36% 0, 100% 0, 100% 100%, 0 100%)",
                }}
                className={clsx("h-full w-full object-cover", {
                  "rotate-180 -scale-y-100": locale === "ar",
                })}
                src="https://s3-eu-west-1.amazonaws.com/com.ulule.assets/site/build/img/newsletter/newsletter-1@2x.84917bf5e0b2.jpg"
                alt=""
              />
              <div
                style={{
                  clipPath: "polygon(36% 0, 100% 0, 100% 100%, 0 100%)",
                }}
                className={clsx(
                  "absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary-700/60",
                  {
                    "rotate-180 -scale-y-100": locale === "ar",
                  }
                )}
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
  let teams: ITeam[] = [];
  let motos: IMoto[] = [];
  let events: IEvent[] = [];
  let articles: IArticle[] = [];
  try {
    const [{ data: motosData }, { data: projectsData }, { data: teamsData },{ data: eventsData},{data:articlesData}] =
      await Promise.all([
        client.get("/motos"),
        client.get("/posts"),
        client.get("/teams"),
        client.get("/events"),
        client.get("/blog"),
      ]);
    projects = projectsData;
    motos = motosData;
    teams = teamsData;
    events = eventsData;
    articles = articlesData;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      projects,
      teams,
      motos,
      events,
      articles,
      ...(await serverSideTranslations(locale as string, [
        "home-page",
        "newsletter",
        "project",
        "common",
        "footer",
        "header",
      ])),
    },
  };
};
