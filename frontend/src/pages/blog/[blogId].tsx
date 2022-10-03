import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IArticle } from "../../interfaces/article";
import { client } from "../../utils/api";

export default function SingleBlogPage({
  blog,
}: {
  blog: IArticle | Record<string, never>;
}) {
  return (
    <>
      <Head>
        <title>Moharik| {blog?.title}</title>
        <meta name="description" content={blog?.content} />
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
              alt={blog?.title}
            />
          </figure>
          <div className="flex flex-col gap-4">
            <p
              className="text-right text-lightDark font-medium leading-relaxed tracking-wide"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            ></p>
          </div>
        </div>
      </section>
    </>
  );
}

// export async function getStaticPaths() {
//   const paths = blogs.map((blog, idx) => ({
//     params: { blogId: idx.toString() },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}) => {
  const { blogId } = query;
  let blog: IArticle | Record<string, never> = {};
  try {
    console.log(blogId);
    const { data } = await client.get(`/blog/${blogId}`);
    blog = data;
    console.log("blog article: ", blog);
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      blog,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "blog",
        "footer",
        "header",
      ])),
    },
  };
};
