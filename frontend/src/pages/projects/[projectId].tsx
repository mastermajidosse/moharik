import { GetServerSideProps } from "next";
import CommentItem from "../../components/items/CommentItem";
import DonatorItem from "../../components/items/DonatorItem";
import { FilledHeartIcon } from "../../components/materials/icons";
import { IProject } from "../../interfaces/project";
import {
  PersonWithHeartIcon,
  ReportFlagIcon,
} from "../../components/materials/icons";
import { client } from "../../utils/api";
import dayjs from "dayjs";
import Head from "next/head";
import { toast } from "react-toastify";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { getCurrentUser } from "../../utils/getCurrentUser";
import clsx from "clsx";
import Link from "next/link";
import ShareModal from "../../components/modals/ShareModal";

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

export default function SingleProjectPage({
  project,
}: {
  project: IProject | Record<string, never>;
}) {
  const {
    _id,
    category,
    collected,
    createdAt,
    deadline,
    desc,
    likes,
    images,
    price,
    title,
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
            price,
            title,
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
        <title>Moharik | {project?.title}</title>
      </Head>
      <section className="container mt-10 py-16 md:py-24 bg-white grid grid-cols-12 gap-10">
        <div className="col-span-full md:col-span-8">
          {/* title */}
          <h1 className="hidden md:block mb-5 text-3xl font-black text-dark tracking-wide">
            {project?.title}
          </h1>
          {/* cover */}
          <figure className="w-full h-[260px] md:h-[400px]">
            <img
              className="w-full h-full object-cover rounded-xl shadow-header-light"
              src={project.images[0]}
              alt=""
            />
          </figure>
          <div className="block md:hidden">
            {/* title */}
            <h1 className="mt-5 text-xl font-black text-dark tracking-wide">
              {project?.title}
            </h1>
            {/* progress bar */}
            <div className="my-2 w-full h-1 rounded-full overflow-hidden bg-primary-100/50">
              <div className="w-0 h-full rounded-full bg-primary-500" />
            </div>
            {/* metadata */}
            <p className="text-dark font-bold text-lg">
              {project?.collected}DH{" "}
              <span className="text-lightDark text-sm">
                raised of {project?.price}DH goal • 0 donors
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
                      Share
                    </button>
                  </ShareModal>
                </div>
              ) : (
                <ShareModal project={project as IProject}>
                  <button className="w-full py-2 bg-gradient-to-tr from-primary-400 to-primary-200 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-500 duration-200">
                    Share
                  </button>
                </ShareModal>
              )}
              <button className="w-full py-2 bg-gradient-to-tr from-primary-700 to-primary-300 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-600 duration-200">
                Donate now
              </button>
            </div>
          </div>
          {/* orgnizer stripe */}
          <div className="md:w-11/12 flex items-center mt-4 gap-2">
            {/* <figure className="w-8 h-8 bg-primary-100/50 rounded-full flex justify-center items-center">
              <PersonWithHeartIcon
                width="20"
                height="20"
                className="text-primary-500"
              />
            </figure>
            <p className="text-sm">
              Amigos de Lucía y Thomas is organizing this .
            </p> */}
            <p className="text-lightDark font-medium text-sm">
              {daysCount > 0
                ? `Created ${daysCount} days ago |`
                : "Created today |"}
            </p>{" "}
            <Link
              href={`/projects?category=${project?.category.toLocaleLowerCase()}`}
            >
              <a className="px-4 capitalize py-0.5 text-sm bg-primary-100/75 text-primary-800 font-medium cursor-pointer">
                {project?.category}
              </a>
            </Link>
          </div>
          {/* separetor */}
          <div className="md:w-11/12 w-full h-[1px] bg-lightDark/25 my-5 md:mb-8" />
          {/* description */}
          <div className="md:w-11/12 my-4">
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: project?.desc }}
            />
          </div>
          {/* share & donate buttons */}
          <div className="md:w-11/12 w-full flex  gap-3 mt-5">
            <button className="w-full py-2 bg-gradient-to-tr from-primary-700 to-primary-300 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-600 duration-200">
              Donate now
            </button>
            <ShareModal project={project as IProject}>
              <button className="w-full py-2 text-lg font-medium text-primary rounded shadow-header-light border-2 border-primary-500 hover:bg-primary-50 duration-200">
                Share
              </button>
            </ShareModal>
          </div>
          <div className="block md:hidden">
            {/* separetor */}
            <div className="w-full h-[1px] bg-lightDark/25 my-5" />
            {/* donators */}
            <div className="">
              <div className="">
                <h2 className="text-xl font-bold text-dark">Donations (3)</h2>
              </div>
              <div className="flex flex-col gap-6 mt-6">
                {Array.from(Array(5)).map((_, idx) => (
                  <DonatorItem key={idx} />
                ))}
              </div>
              <button className="w-full mt-8 px-4 py-1 text-lg font-medium text-primary rounded shadow-header-light border border-primary-500 hover:bg-primary-50 duration-200">
                See all
              </button>
            </div>
          </div>
          {/* separetor */}
          <div className="md:w-11/12 w-full h-[1px] bg-lightDark/25 my-5 md:my-12" />
          {/* Organizer details */}
          <div className="md:w-11/12">
            <div className="">
              <h2 className="text-xl font-bold text-dark">Organizer</h2>
            </div>
            <div className="flex gap-4 mt-6">
              <figure className="w-14 h-14 bg-primary-100/50 rounded-full flex justify-center items-center">
                {/* <PersonWithHeartIcon
                  width="24"
                  height="24"
                  className="text-primary-500"
                /> */}
                <b>M</b>
              </figure>
              <div className="flex flex-col gap-2 text-dark">
                <h2 className="font-bold">Moharik</h2>
                <p className="text-sm font-medium text-lightDark">Organizer</p>
                <p className="text-sm font-medium text-lightDark">
                  Reach us out
                </p>
                <button className="w-fit mt-2 px-4 py-1 text-lg font-medium text-primary rounded shadow-header-light border border-primary-500 hover:bg-primary-50 duration-200">
                  Contact
                </button>
              </div>
            </div>
          </div>
          {/* separetor */}
          <div className="md:w-11/12 w-full h-[1px] bg-lightDark/25 my-5 md:my-12" />
          {/* comments */}
          <div className="md:w-11/12 ">
            <div className="">
              <h2 className="text-xl font-bold text-dark">Comments (0)</h2>
              <p className="font-meduim text-lightDark">
                Please donate to share words of support.
              </p>
            </div>
            {/* <div className="flex flex-col gap-6 mt-6">
              {Array.from(Array(5)).map((_, idx) => (
                <CommentItem key={idx} />
              ))}
            </div> */}
          </div>
          {/* separetor */}
          <div className="md:w-11/12 w-full h-[1px] bg-lightDark/25 my-5 md:my-12" />
          {/* report */}
          <div className="flex justify-center items-center gap-2 pt-8">
            <ReportFlagIcon width="20" height="20" />
            <p className="font-medium cursor-pointer hover:underline">Report</p>
          </div>
        </div>
        {/* aside */}
        <aside className="hidden md:block col-span-4 relative">
          <div className="sticky top-4 w-full bg-white p-6 rounded-lg shadow-aside">
            {/* metadata */}
            <p className="text-dark font-bold text-2xl">
              {project?.collected}DH{" "}
              <span className="text-lightDark text-sm">
                raised of {project?.price}DH goal
              </span>
            </p>
            {/* progress bar */}
            <div className="my-2 w-full h-1 rounded-full overflow-hidden bg-primary-100/50">
              <div className="w-0 h-full rounded-full bg-primary-500" />
            </div>
            <p className="text-lightDark text-sm">0 donors</p>
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
                    Share
                  </button>
                </ShareModal>
              </div>
              <button className="w-full py-2 bg-gradient-to-tr from-primary-700 to-primary-300 text-lg font-medium text-light rounded shadow-header-light hover:from-primary-600 duration-200">
                Donate now
              </button>
            </div>
            {/* separetor */}
            <div className="w-full h-[1px] bg-lightDark/25 my-5" />
            {/* donators */}
            <div className="">
              <div className="">
                <h2 className="text-xl font-bold text-dark">Donators (0)</h2>
              </div>
              {/* <div className="flex flex-col gap-6 mt-6">
                {Array.from(Array(3)).map((_, idx) => (
                  <DonatorItem key={idx} />
                ))}
              </div>
              <button className="w-full mt-8 px-4 py-1 text-lg font-medium text-primary rounded shadow-header-light border border-primary-500 hover:bg-primary-50 duration-200">
                See all
              </button> */}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
    },
  };
};
