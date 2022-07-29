import { GetServerSideProps } from "next";
import Head from "next/head";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { PersonWithHeartIcon } from "../../../components/materials/icons";
import { ReportFlagIcon } from "../../../components/materials/icons";
import { client } from "../../../utils/api";
import ShareTeamModal from "../../../components/modals/ShareTeamModal";
import ContactModal from "../../../components/modals/ContactModal";
import CoverCarousel from "../../../components/carousels/CoverCarousel";
import ReportModal from "../../../components/modals/ReportModal";
import { ICategory } from "../../../interfaces/category";
import { useRouter } from "next/router";
import { ITeam } from "../../../interfaces/team";
import { getCurrentUser } from "../../../utils/getCurrentUser";
import CreateComment from "../../../components/materials/CreateComment";
import CommentItem from "../../../components/items/CommentItem";

export default function SingleTeamPage({
  team,
}: {
  team: ITeam | Record<string, never>;
}) {
  const { t } = useTranslation("project");
  const { t: tt } = useTranslation("common");
  const { locale } = useRouter();
  const {
    _id,
    description,
    link,
    images,
    title,
    members,
    needs,
    tags,
    user,
    createdAt,
    comments,
  } = team;

  const daysCount = dayjs(Date.now()).diff(dayjs(createdAt), "days");

  return (
    <>
      <Head>
        <title>Moharik | {title}</title>
        <meta name="description" content={description} />
      </Head>
      <section className="container mt-10 py-16 md:py-24 bg-white grid grid-cols-12 gap-10">
        <div className="col-span-full md:col-span-8">
          {/* title */}
          <h1 className="hidden md:block mb-5 text-3xl font-black text-dark tracking-wide">
            {title}
          </h1>
          {/* cover */}
          <CoverCarousel images={images} alt={title} />
          <div className="block md:hidden">
            {/* title */}
            <h1 className="mt-5 text-xl font-black text-dark tracking-wide">
              {title}
            </h1>
            <div className="w-full flex gap-3 mt-5">
              <ShareTeamModal title={title}>
                <button className="w-full py-2 bg-gradient-to-tr from-primary-400 to-primary-200 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-500 duration-200">
                  {tt("share")}
                </button>
              </ShareTeamModal>

              <a
                target="_blank"
                href={link || "https://patreon.com/Moharik"}
                rel="noreferrer"
                className="w-full text-center py-2 bg-gradient-to-tr from-link/95 to-link/60 text-lg font-medium text-light rounded shadow-header-light hover:from-link hover:to-link/75 duration-200"
              >
                + {tt("Join")}
              </a>
            </div>
          </div>
          {/* orgnizer stripe */}
          <div className="md:w-full flex justify-between items-center mt-4 gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-dark">Tags: </p>
              <ul className="flex gap-2 font-bold text-dark/50">
                {tags.map((tag, idx) => (
                  <li
                    className="font-medium text-sm text-dark bg-slate-200/75 px-2 py-1 rounded-md"
                    key={idx}
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-lightDark font-medium text-sm">
              {daysCount > 0
                ? t("created_days_ago", { date: daysCount })
                : t("created_today")}
            </p>{" "}
          </div>
          {/* separetor */}
          <div className="md:w-11/12 w-full h-[1px] bg-lightDark/25 my-5 md:mb-8" />
          {/* description */}
          <div className="md:w-11/12 my-4">
            <div className="">
              <h2 className="text-xl font-bold text-dark">
                {t("Description")}
              </h2>
            </div>
            <div
              className="mt-6"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
          {/* separetor */}
          <div className="md:w-11/12 w-full h-[1px] bg-lightDark/25 my-5 md:my-12" />
          {/* Needs */}
          <div className="md:w-11/12 my-4">
            <div className="">
              <h2 className="text-xl font-bold text-dark">
                {t("Requirements")}
              </h2>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-4">
              {needs?.map(({ description, title }, idx) => (
                <li className="" key={idx}>
                  <p className="capitalize font-semibold text-dark/80 mb-1 p-1.5 bg-slate-100 rounded-sm">
                    {title}
                  </p>
                  <p className="text-sm font-medium text-dark/60 p-1.5 bg-slate-100/50 rounded-sm">
                    {description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="block md:hidden">
            {/* separetor */}
            <div className="w-full h-[1px] bg-lightDark/25 my-5" />
            {/* members */}
            <div className="">
              <div className="">
                <h2 className="text-xl font-bold text-dark">
                  {t("Members")} ({members?.length || 0} )
                </h2>
              </div>
              <div className="flex flex-col gap-6 mt-6"></div>
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
              <CreateComment target="teams" id={_id || ""} />
            )}
            {comments && (
              <div className="flex flex-col gap-6 mt-6">
                {comments?.map(({ author, comment, createdAt, _id }, idx) => (
                  <CommentItem
                    key={idx}
                    target="teams"
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
          <div className="sticky top-24 w-full bg-white p-6 rounded-lg shadow-aside">
            {/* share & donate buttons  */}
            <div className="w-full flex flex-col gap-3 mt-5">
              <div className="flex gap-2">
                <ShareTeamModal title={title}>
                  <button className="w-full py-2 bg-gradient-to-tr from-primary-400 to-primary-200 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-500 duration-200">
                    {tt("share")}
                  </button>
                </ShareTeamModal>
              </div>
              <a
                target="_blank"
                href={link || "https://patreon.com/Moharik"}
                rel="noreferrer"
                className="w-full text-center py-2 bg-gradient-to-tr from-link/95 to-link/60 text-lg font-medium text-light rounded shadow-header-light hover:from-link hover:to-link/75 duration-200"
              >
                + {tt("Join")}
              </a>
            </div>
            {/* separetor */}
            <div className="w-full h-[1px] bg-lightDark/25 my-5" />
            {/* donators */}
            <div className="">
              <div className="">
                <h2 className="text-xl font-bold text-dark">
                  {t("Members")} (1)
                </h2>
              </div>
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex gap-4">
                  <figure className="w-10 h-10 bg-light rounded-full flex justify-center items-center">
                    <PersonWithHeartIcon
                      width="20"
                      height="20"
                      className="text-lightDark"
                    />
                  </figure>
                  <div className="flex flex-col text-dark">
                    <h3 className="font-bold">Othman Mojahid</h3>
                    <p className="text-sm font-medium text-lightDark">
                      Mobile Developer
                    </p>
                  </div>
                </div>
              </div>
              {/* <button className="w-full mt-8 px-4 py-1 text-lg font-medium text-primary rounded shadow-header-light border border-primary-500 hover:bg-primary-50 duration-200">
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
  const { teamId } = query;
  let team: ITeam | Record<string, never> = {};
  try {
    const { data } = await client.get(`/teams/${teamId}`);
    team = data;
    // console.log("projects: ", project);
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      team,
      ...(await serverSideTranslations(locale as string, [
        "project",
        "common",
        "footer",
        "header",
      ])),
    },
  };
};
