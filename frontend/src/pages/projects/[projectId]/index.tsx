import { GetServerSideProps } from "next";
import Link from "next/link";
import Head from "next/head";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import DonatorItem from "../../../components/items/DonatorItem";
import {
  FilledHeartIcon,
  PersonWithHeartIcon,
} from "../../../components/materials/icons";
import { IProject } from "../../../interfaces/project";
import { ReportFlagIcon } from "../../../components/materials/icons";
import { client } from "../../../utils/api";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { getCurrentUser } from "../../../utils/getCurrentUser";
import ShareModal from "../../../components/modals/ShareModal";
import ContactModal from "../../../components/modals/ContactModal";
import CoverCarousel from "../../../components/carousels/CoverCarousel";
import ReportModal from "../../../components/modals/ReportModal";
import { ICategory } from "../../../interfaces/category";
import { useRouter } from "next/router";
import CommentItem from "../../../components/items/CommentItem";
import CreateComment from "../../../components/materials/CreateComment";

interface ProjectCardProps {
  id: string;
  link?: string;
  title:
    | string
    | {
        en: string;
        ar: string;
      };
  desc?:
    | string
    | {
        en: string;
        ar: string;
      };
  category?: ICategory;
  images: string[];
  collected?: number;
  deadline?: Date;
  createdAt: Date;
  likes?: string[] | [];
}

export default function SingleProjectPage({
  project,
}: {
  project: IProject | Record<string, never>;
}) {
  const { t } = useTranslation("project");
  const { t: tt } = useTranslation("common");
  const { locale } = useRouter();
  const {
    _id,
    category,
    collected,
    createdAt,
    deadline,
    desc,
    likes,
    images,
    title,
    link,
    user,
    comments,
  } = project;
  const [storedValue, setValue] = useLocalStorage<ProjectCardProps[]>(
    "likes",
    []
  );
  async function handleLike() {
    try {
      if (!storedValue.find((item) => item.id === _id)) {
        setValue([
          {
            category,
            collected,
            createdAt,
            deadline,
            desc,
            likes,
            images,
            title,
            link,
            id: _id,
          },
          ...storedValue,
        ]);
        toast.success("Project is Liked", {
          icon: "❤️",
        });
      } else {
        setValue((val) => val.filter((item) => item.id !== _id));
        toast.success("Project is Unliked", {
          icon: "💔",
        });
      }
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log(error);
    }
  }

  const daysCount = dayjs(Date.now()).diff(dayjs(project.createdAt), "days");

  return (
    <>
      <Head>
        <title>
          Moharik |{" "}
          {typeof project?.title === "string"
            ? project?.title
            : locale === "ar"
            ? project?.title?.en
            : project?.title?.en}
        </title>
        <meta
          name="description"
          content={
            typeof project?.desc === "string"
              ? project?.desc
              : locale === "ar"
              ? project?.desc?.en
              : project?.desc?.en
          }
        />
      </Head>
      <section className="container py-12 md:py-16 bg-white grid grid-cols-12 gap-10">
        <div className="col-span-full md:col-span-8">
          {/* title */}
          <h1 className="hidden md:block mb-5 text-3xl font-black text-dark tracking-wide">
            {typeof project?.title === "string"
              ? project?.title
              : locale === "ar"
              ? project?.title?.en
              : project?.title?.en}
          </h1>
          {/* cover */}
          <CoverCarousel
            images={images}
            alt={
              typeof project?.title === "string"
                ? project?.title
                : locale === "ar"
                ? project?.title?.en
                : project?.title?.en
            }
          />
          <div className="block md:hidden">
            {/* title */}
            <h1 className="mt-5 text-xl font-black text-dark tracking-wide">
              {typeof project?.title === "string"
                ? project?.title
                : locale === "ar"
                ? project?.title?.en
                : project?.title?.en}
            </h1>
            {/* progress bar */}
            <div className="my-2 w-full h-1 rounded-full overflow-hidden bg-primary-100/50">
              <div className="w-0 h-full rounded-full bg-primary-500" />
            </div>
            {/* metadata */}
            <p className="text-dark font-bold text-lg">
              {project?.collected}DH{" "}
              <span className="text-lightDark text-sm">
                {t("raised_of")} {project?.price}DH {t("goal")} • 0{" "}
                {t("donors")}
              </span>
            </p>
            {/* share & donate buttons  */}
            <div className="w-full flex flex-col gap-3 mt-5">
              {getCurrentUser() ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleLike}
                    className={clsx(
                      "w-fit px-4 py-2 font-medium text-light rounded shadow-header-light duration-200",
                      {
                        "bg-gradient-to-tr from-secondary-400 to-secondary-200 text-lg hover:from-secondary-500":
                          !storedValue.find((item) => item.id === _id),
                        "bg-gradient-to-tr from-red-400 to-red-200 text-lg hover:from-red-500":
                          storedValue.find((item) => item.id === _id),
                      }
                    )}
                  >
                    <FilledHeartIcon width="22" height="22" />
                  </button>
                  <ShareModal project={project as IProject}>
                    <button className="w-full py-2 bg-gradient-to-tr from-primary-400 to-primary-200 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-500 duration-200">
                      {tt("share")}
                    </button>
                  </ShareModal>
                </div>
              ) : (
                <ShareModal project={project as IProject}>
                  <button className="w-full py-2 bg-gradient-to-tr from-primary-400 to-primary-200 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-500 duration-200">
                    {tt("share")}
                  </button>
                </ShareModal>
              )}
              <a
                target="_blank"
                href={link}
                //  ? supportLink : "https://patreon.com/Moharik"}
                rel="noreferrer"
                className="w-full text-center py-2 bg-gradient-to-tr from-primary-700 to-primary-300 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-600 duration-200"
              >
                {tt("support")}
              </a>
            </div>
          </div>
          {/* orgnizer stripe */}
          <div className="md:w-11/12 flex items-center mt-4 gap-2">
            <p className="text-lightDark font-medium text-sm">
              {daysCount > 0
                ? t("created_days_ago", { date: daysCount }) + " |"
                : t("created_today") + " |"}
            </p>{" "}
            <Link
              href={`/projects?category=${
                project?.category?.name.en?.toLocaleLowerCase() || ""
              }`}
            >
              <a
                style={{
                  backgroundColor: project?.category?.color || "#22A8B2",
                }}
                className="px-4 capitalize py-0.5 text-sm text-white font-medium cursor-pointer"
              >
                {project?.category?.name.en}
              </a>
            </Link>
          </div>
          <div className="md:w-11/12 flex items-center mt-4 gap-2">
            <p className="font-bold text-dark">Keywords: </p>
            <ul className="flex gap-2 font-bold text-dark/50">
              {category?.keywords.map((keyword, idx) => (
                <li key={idx} className="">
                  #{keyword}
                </li>
              ))}
            </ul>
          </div>
          {/* separetor */}
          <div className="md:w-11/12 w-full h-[1px] bg-lightDark/25 my-5 md:mb-8" />
          {/* description */}
          <div className="md:w-11/12 my-4">
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html:
                  typeof project?.desc === "string"
                    ? project?.desc
                    : locale === "ar"
                    ? project?.desc?.en
                    : project?.desc?.en,
              }}
            />
          </div>
          {/* share & donate buttons */}
          <div className="md:w-11/12 w-full flex  gap-3 mt-5">
            <a
              target="_blank"
              href={link}

              // href={supportLink ? supportLink : "https://patreon.com/Moharik"}
              rel="noreferrer"
              className="w-full text-center py-2 bg-gradient-to-tr from-primary-700 to-primary-300 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-600 duration-200"
            >
              {tt("support")}
            </a>
            <ShareModal project={project as IProject}>
              <button className="w-full py-2 text-lg font-medium text-primary rounded shadow-header-light border-2 border-primary-500 hover:bg-primary-50 duration-200">
                {tt("share")}
              </button>
            </ShareModal>
          </div>
          <div className="block md:hidden">
            {/* separetor */}
            <div className="w-full h-[1px] bg-lightDark/25 my-5" />
            {/* donators */}
            <div className="">
              <div className="">
                <h2 className="text-xl font-bold text-dark">
                  {t("donators")} (0)
                </h2>
              </div>
              <div className="flex flex-col gap-6 mt-6">
                {Array.from(Array(0)).map((_, idx) => (
                  <DonatorItem key={idx} />
                ))}
              </div>
              <button className="w-full mt-8 px-4 py-1 text-lg font-medium text-primary rounded shadow-header-light border border-primary-500 hover:bg-primary-50 duration-200">
                {tt("see_all")}
              </button>
            </div>
          </div>
          {/* separetor */}
          <div className="md:w-11/12 w-full h-[1px] bg-lightDark/25 my-5 md:my-12" />
          {/* Organizer details */}
          <div className="md:w-11/12">
            <div className="">
              <h2 className="text-xl font-bold text-dark">{t("organizer")}</h2>
            </div>
            <div className="flex gap-4 mt-6">
              <figure className="w-14 h-14 bg-primary-100/50 rounded-full flex justify-center items-center">
                <PersonWithHeartIcon
                  width="24"
                  height="24"
                  className="text-primary-500"
                />
              </figure>
              <div className="flex flex-col gap-2 text-dark">
                <h2 className="font-bold capitalize">{user?.name || "----"}</h2>
                {/* <p className="text-sm font-medium text-lightDark">
                  {t("organizer")}
                </p> */}
                <p className="text-sm font-medium text-lightDark">
                  {t("reach_us_out")}
                </p>
                <ContactModal contact={user}>
                  <button className="w-fit mt-2 px-4 py-1 text-lg font-medium text-primary rounded shadow-header-light border border-primary-500 hover:bg-primary-50 duration-200">
                    {tt("contact")}
                  </button>
                </ContactModal>
              </div>
            </div>
          </div>
          {/* separetor */}
          <div className="md:w-11/12 w-full h-[1px] bg-lightDark/25 my-5 md:my-12" />
          {/* comments */}
          <div className="md:w-11/12 ">
            <div className="">
              <h2 className="text-xl font-bold text-dark">
                {t("comments")} ({comments?.length || 0})
              </h2>
              <p className="font-meduim text-lightDark">{t("comment_desc")}</p>
            </div>
            {/* create comment box */}
            {getCurrentUser() && (
              <CreateComment target="posts" id={_id || ""} />
            )}
            {comments && (
              <div className="flex flex-col gap-6 mt-6">
                {comments?.map(({ author, comment, createdAt, _id }, idx) => (
                  <CommentItem
                    key={idx}
                    target="posts"
                    author={author?.name}
                    createdAt={createdAt}
                    comment={comment}
                    authorId={author?._id}
                    commentId={_id}
                  />
                ))}
              </div>
            )}
          </div>
          {/* separetor */}
          <div className="md:w-11/12 w-full h-[1px] bg-lightDark/25 my-5 md:my-12" />
          {/* report */}
          <div className="w-full pt-8 flex justify-center items-center gap-2">
            <ReportModal contact={{}}>
              <button className="group hover:underline hover:text-red-500 w-fit mx-auto flex justify-center items-center gap-2">
                <ReportFlagIcon width="20" height="20" />
                <p className="font-medium cursor-pointer">{tt("report")}</p>
              </button>
            </ReportModal>
          </div>
        </div>
        {/* aside */}
        <aside className="hidden md:block col-span-4 relative">
          <div className="sticky top-4 w-full bg-white p-6 rounded-lg shadow-aside">
            {/* metadata */}
            {/* <p className="text-dark font-bold text-2xl">
              {project?.collected}DH{" "}
              <span className="text-lightDark text-sm">
                {t("raised_of")} {project?.price}DH {t("goal")}
              </span>
            </p> */}
            {/* progress bar */}
            <div className="my-2 w-full h-1 rounded-full overflow-hidden bg-primary-100/50">
              <div className="w-0 h-full rounded-full bg-primary-500" />
            </div>
            {/* <p className="text-lightDark text-sm">0 {t("donors")}</p> */}
            {/* share & donate buttons  */}
            <div className="w-full flex flex-col gap-3 mt-5">
              <div className="flex gap-2">
                {getCurrentUser() && (
                  <button
                    onClick={handleLike}
                    className={clsx(
                      "w-fit px-4 py-2 font-medium text-light rounded shadow-header-light duration-200",
                      {
                        "bg-gradient-to-tr from-secondary-400 to-secondary-200 text-lg hover:from-secondary-500":
                          !storedValue.find((item) => item.id === _id),
                        "bg-gradient-to-tr from-red-400 to-red-200 text-lg hover:from-red-500":
                          storedValue.find((item) => item.id === _id),
                      }
                    )}
                  >
                    <FilledHeartIcon width="22" height="22" />
                  </button>
                )}
                <ShareModal project={project as IProject}>
                  <button className="w-full py-2 bg-gradient-to-tr from-primary-400 to-primary-200 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-500 duration-200">
                    {tt("share")}
                  </button>
                </ShareModal>
              </div>
              <a
                target="_blank"
                href={link}

                // href={supportLink ? supportLink : "https://patreon.com/Moharik"}
                rel="noreferrer"
                className="w-full text-center py-2 bg-gradient-to-tr from-primary-700 to-primary-300 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-600 duration-200"
              >
                {tt("support")}
              </a>
            </div>
            {/* separetor */}
            <div className="w-full h-[1px] bg-lightDark/25 my-5" />
            {/* donators */}
            <div className="">
              <div className="">
                {/* <h2 className="text-xl font-bold text-dark">
                  {t("donators")} (0)
                </h2> */}
              </div>
              {/* <div className="flex flex-col gap-6 mt-6">
                {Array.from(Array(3)).map((_, idx) => (
                  <DonatorItem key={idx} />
                ))}
              </div>
              <button className="w-full mt-8 px-4 py-1 text-lg font-medium text-primary rounded shadow-header-light border border-primary-500 hover:bg-primary-50 duration-200">
                {tt("see_all")}
              </button> */}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}) => {
  const { projectId } = query;
  let project: IProject | Record<string, never> = {};
  try {
    const { data } = await client.get(`/posts/${projectId}`);
    project = data;
    // console.log("projects: ", project);
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      project,
      ...(await serverSideTranslations(locale as string, [
        "project",
        "common",
        "footer",
        "header",
      ])),
    },
  };
};
