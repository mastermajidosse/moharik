import { useRouter } from "next/router";
import { blogs } from "../../data/blogs";
import Head from "next/head";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SingleBlogPage() {
  const {
    query: { blogId },
  } = useRouter();
  const blog = blogs[(blogId as unknown as number) || 0];
  console.log("blogId: ", blogId);

  return (
    <>
      <Head>
        <title>Moharik| {blog?.title}</title>
      </Head>
      <section className="w-full bg-light min-h-screen mt-10">
        <div className="container bg-white min-h-screen py-28 flex flex-col gap-12">
          <h1 className="text-2xl md:text-3xl text-dark font-bold text-center">
            {blog?.title}
          </h1>
          <figure className="w-full h-[360px]">
            <img
              className="w-full h-full object-cover rounded-xl shadow-lg"
              src={blog?.image}
              alt=""
            />
          </figure>
          <div className="flex flex-col gap-4">
            <p
              className="text-right text-lightDark font-medium leading-relaxed tracking-wide"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            ></p>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const paths = blogs.map((blog, idx) => ({
    params: { blogId: idx.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "blog",
        "footer",
        "header",
      ])),
    },
  };
};
