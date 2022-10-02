import { GetServerSideProps } from "next";
import CategoriesStripe from "../../components/cards/CategoriesStripe";
import ProjectCard from "../../components/cards/ProjectCard";
import { IProject } from "../../interfaces/project";
import { client } from "../../utils/api";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface ProjectsPageProps {
  projects: IProject[] | [];
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  const { t } = useTranslation("project");
  const { t: tt } = useTranslation("common");
  const { query } = useRouter();
  const [limit, setLimit] = useState(12);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    setCategory((query?.category as string) || null);
  }, [query?.category]);
  return (
    <>
      <Head>
        <title>Moharik | Projects</title>
      </Head>
      <section className="container mt-10 py-16 md:py-24 bg-white flex flex-col">
        <div className="">
          <div className="mb-14 text-center">
            <h1 className="text-3xl font-black text-dark">
              {t("project_categories")}
            </h1>
            <p className="w-full md:w-3/5 md:mx-auto text-lightDark mt-8">
              {t("project_categories_desc")}
            </p>
          </div>
          <CategoriesStripe />
        </div>
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
          {category
            ? projects
                .filter((item) => item.category?.name.en === category)
                // .filter(
                //   (item) =>
                //     item?.status?.toLocaleLowerCase() === "top" ||
                //     item?.status?.toLocaleLowerCase() === "approved"
                // )
                .slice(0, limit)
                .map(
                  (
                    {
                      _id,
                      category,
                      deadline,
                      desc,
                      images,
                      price,
                      title,
                      createdAt,
                      collected,
                    },
                    idx
                  ) => (
                    <ProjectCard
                      key={idx}
                      title={title}
                      createdAt={createdAt}
                      id={_id}
                      category={category}
                      // deadline={deadline}
                      price={price}
                      desc={desc}
                      images={images}
                      collected={collected || 0}
                    />
                  )
                )
            : projects
                // .filter(
                //   (item) =>
                //     item?.status?.toLocaleLowerCase() === "top" ||
                //     item?.status?.toLocaleLowerCase() === "approved"
                // )
                .slice(0, limit)
                .map(
                  (
                    {
                      _id,
                      category,
                      // deadline,
                      desc,
                      images,
                      price,
                      title,
                      createdAt,
                      collected,
                    },
                    idx
                  ) => (
                    <ProjectCard
                      key={idx}
                      title={title}
                      createdAt={createdAt}
                      id={_id}
                      category={category}
                      // deadline={deadline}
                      price={price}
                      desc={desc}
                      images={images}
                      collected={collected || 0}
                    />
                  )
                )}
        </div>
        {projects.length > limit && (
          <button
            onClick={() => setLimit(limit + 12)}
            className="w-fit mx-auto px-6 py-2 border-secondary border text-lg font-medium text-secondary hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-600 duration-200 rounded-md"
          >
            {tt("show_more")}
          </button>
        )}
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  let projects: IProject[] = [];
  try {
    const { data } = await client.get("/posts");
    projects = data;
    // console.log("projects: ", projects);
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      projects,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "project",
        "footer",
        "header",
      ])),
    },
  };
};
