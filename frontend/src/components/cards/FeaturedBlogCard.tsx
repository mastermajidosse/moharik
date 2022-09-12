import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import { IArticle } from "../../interfaces/article";


interface BlogArticleProps {
  blog: IArticle ;
}



export default function FeaturedBlogCard({
  blog
}: BlogArticleProps) {

console.log(blog)
  const { locale } = useRouter();
  return (
    <section className="relative w-full md:h-[480px] h-[300px]">
      <Link href={`/blog/${blog._id}`}>
        <a>
          <figure
            className={clsx(
              "absolute top-0 w-6/12 md:w-8/12 h-full shadow-lg cursor-pointer hover:shadow-primary-100/30 duration-200 overflow-hidden",
              {
                "right-0 rounded-l-md": locale === "en",
                "left-0 rounded-r-md": locale === "ar",
              }
            )}
          >
            <img
              className="w-full h-full object-cover"
              src={blog?.image}
              alt={blog?.title}
            />
          </figure>
          <div className="container h-full">
            <div className="w-5/12 md:w-3/12 ml-2 h-full flex flex-col justify-center gap-2">
              <a>
                <h1 className="text-xl md:text-2xl text-dark font-bold cursor-pointer hover:underline duration-200 decoration-link">
                  {blog?.title}
                </h1>
              </a>
              <p className="text-sm md:text-base text-lightDark line-clamp-4">
                {blog?.content?.replace(/(<([^>]+)>)/gi, "")}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </section>
  );
}
