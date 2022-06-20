import { GetServerSideProps } from "next";
import Link from "next/link";
import ProjectCard from "../components/cards/ProjectCard";
import { SquaredSolidButton } from "../components/materials/Buttons";
import {
  EmailIcon,
  GlobeIcon,
  LogoutIcon,
} from "../components/materials/icons";
import { ICurrentUser } from "../interfaces/currentUser";
import { IProject } from "../interfaces/project";
import { client } from "../utils/api";
import { useState } from "react";
import clsx from "clsx";
import { removeCookies } from "cookies-next";
import Head from "next/head";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface ProfilePageProps {
  myProjects: IProject[];
  myFavorites: IProject[];
  myProfile: ICurrentUser;
}

interface ProjectCardProps {
  id: string;
  title: string;
  desc?: string;
  category: string;
  images: string[];
  price?: number;
  collected?: number;
  deadline?: Date;
  createdAt: Date;
  likes?: string[] | [];
}

export default function ProfilePage({
  myProjects,
  myFavorites,
  myProfile,
}: ProfilePageProps) {
  const [active, setActive] = useState<"projects" | "favorites">("projects");
  const [storedValue, setValue] = useLocalStorage<ProjectCardProps[]>(
    "likes",
    []
  );
  function logOut() {
    removeCookies("currentUser");
    window.location.assign("/");
  }

  return (
    <div className="mt-20 bg-light ">
      <Head>
        <title>Moharik | Profile</title>
      </Head>
      {/* cover */}
      <section className="w-full h-72">
        <figure className="relative __pattern w-full h-full flex justify-center items-center group cursor-pointer">
          <div className="absolute top-0 left-0 w-full h-full z-0 bg-dark/30 invisible group-hover:visible duration-200" />
          <div className="text-center flex flex-col justify-center items-center group cursor-pointer text-white relative z-10 invisible group-hover:visible duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="95"
              height="95"
              fill="currentColor"
              className="bi bi-camera"
              viewBox="0 0 16 16"
            >
              <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
              <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
            </svg>
            <p className="font-bold text-lg">Change your cover image</p>
          </div>
        </figure>
      </section>
      {/* main */}
      <section className="container min-h-screen grid grid-cols-12 gap-4 py-4 bg-white">
        <aside className="hidden md:flex md:col-span-2 h-full bg-light rounded-md border-2 border-light p-2">
          <div className="w-full flex flex-col gap-2 items-center">
            <figure className="relative __pattern w-28 h-28 mx-auto rounded-full ring-2 ring-primary-100 shadow-md"></figure>
            <p className="text-lg font-medium text-dark">
              {myProfile.name || "---"}
            </p>
            <div className="w-full">
              <p className="font-medium text-sm flex items-center gap-1.5 text-lightDark mb-2">
                <EmailIcon /> {myProfile.email || "---"}
              </p>
              <p className="font-medium text-sm flex items-center gap-1.5 text-lightDark">
                <GlobeIcon /> {myProfile?.country || "---"}
              </p>
            </div>
            <div
              onClick={logOut}
              className="w-full flex items-center gap-2 cursor-pointer hover:text-link text-lightDark"
            >
              <LogoutIcon width="18" height="18" className="mb-1.5  " />
              <p className="font-medium text-sm flex items-center gap-1.5  mb-2">
                Sign out
              </p>
            </div>
          </div>
        </aside>
        <article className="col-span-full md:col-span-10 h-full bg-light rounded-md border-2 border-light p-4">
          <div className="flex justify-between items-center mb-8">
            <ul className="flex gap-4">
              <li
                onClick={() => setActive("projects")}
                className={clsx(
                  "rounded-md font-medium px-4 py-2 cursor-pointer",
                  {
                    "bg-slate-200 text-dark": active === "favorites",
                    "bg-link text-white": active === "projects",
                  }
                )}
              >
                My projects
              </li>
              <li
                onClick={() => setActive("favorites")}
                className={clsx(
                  "rounded-md font-medium px-4 py-2 cursor-pointer",
                  {
                    "bg-slate-200 text-dark": active === "projects",
                    "bg-link text-white": active === "favorites",
                  }
                )}
              >
                My favorites
              </li>
            </ul>
            <Link href="/projects/create">
              <a className="rounded-md font-medium px-4 py-2 cursor-pointer bg-primary-600 text-white">
                Launch Project
              </a>
            </Link>
          </div>
          <div className="">
            {active === "projects" && <MyProjects myProjects={myProjects} />}
            {active === "favorites" && (
              <MyFavorites myFavorites={storedValue || []} />
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

function MyFavorites({
  myFavorites,
}: {
  myFavorites: ProjectCardProps[] | [];
}) {
  if (!myFavorites) return <EmptyProfile />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {myFavorites.map(
        ({ id, category, deadline, images, title, createdAt }, idx) => (
          <ProjectCard
            key={idx}
            title={title}
            createdAt={createdAt}
            id={id}
            category={category}
            deadline={deadline}
            images={images}
          />
        )
      )}
    </div>
  );
}
function MyProjects({ myProjects }: { myProjects: IProject[] | [] }) {
  if (!myProjects) return <EmptyProfile />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {myProjects.map(
        ({ _id, category, deadline, images, title, createdAt }, idx) => (
          <ProjectCard
            key={idx}
            title={title}
            createdAt={createdAt}
            id={_id}
            category={category}
            deadline={deadline}
            images={images}
          />
        )
      )}
    </div>
  );
}

function EmptyProfile() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="font-medium text-lightDark text-lg text-center -mb-4">
        There is no project!
        <br /> create one:
      </p>
      <Link href="/projects/create">
        <SquaredSolidButton>
          <a className="">Create project</a>
        </SquaredSolidButton>
      </Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req: { cookies },
  locale,
}) => {
  let myProjects: IProject[] = [];
  let myProfile: ICurrentUser | any = {};
  try {
    if (!cookies.currentUser) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // get profile data
    const [{ data: myProjectsData }, { data: myProfileData }] =
      await Promise.all([
        client.get<IProject[]>(
          `/posts/user/${
            (JSON.parse(cookies.currentUser) as ICurrentUser)?._id || ""
          }`
        ),
        // client.get(),
        client.get<ICurrentUser>("/users/profile", {
          headers: {
            Authorization: `Bearer ${
              (JSON.parse(cookies.currentUser) as ICurrentUser)?.token || ""
            }`,
          },
        }),
      ]);

    myProjects = myProjectsData;
    myProfile = myProfileData;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      myProjects,
      myProfile,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "footer",
        "header",
      ])),
    },
  };
};
