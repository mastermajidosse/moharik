import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import BlogCard from "../../components/cards/BlogCard";
import FeaturedBlogCard from "../../components/cards/FeaturedBlogCard";
import { blogs } from "../../data/blogs";

export default function BlogPage() {
  const { t } = useTranslation("blog");
  const { t: tt } = useTranslation("common");
  return (
    <div className="mt-10 py-16 md:py-24">
      <Head>
        <title>Moharik | Blogs</title>
        <meta
          name="description"
          content="Resources and tips to help raise more money"
        />
      </Head>
      {/* featured blog */}
      <FeaturedBlogCard />
      {/* page title */}
      <div className="container my-20 text-center">
        <h1 className="text-2xl md:text-3xl text-dark font-bold">
          {t("moharik_blog_title")}
        </h1>
        <p className="text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide">
          {t("moharik_blog_subtitle")}
        </p>
      </div>
      {/* blog list */}
      <section className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {blogs.map((blog, idx) => (
            <BlogCard key={idx} idx={idx} {...blog} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button className="w-fit mx-auto px-6 py-2 border-primary border text-lg font-medium text-primary hover:border-primary-600 hover:bg-primary-50 hover:text-primary-600 duration-200 rounded-md">
            {tt("show_more")}
          </button>
        </div>
      </section>
    </div>
  );
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
