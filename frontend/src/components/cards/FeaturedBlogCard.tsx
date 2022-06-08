import Link from "next/link";
import { blogs } from "../../data/blogs";
export default function FeaturedBlogCard() {
  const { description, image, title } = blogs[0];
  return (
    <section className="relative w-full h-[480px]">
      <Link href="/blog/0">
        <a className="">
          <figure className="absolute top-0 right-0 w-6/12 md:w-8/12 h-full rounded-l-md shadow-lg cursor-pointer hover:shadow-primary-100/30 duration-200">
            <img
              className="w-full h-full object-cover rounded-l-md"
              src={image}
              alt=""
            />
          </figure>
        </a>
      </Link>
      <div className="container h-full">
        <div className="w-5/12 md:w-3/12 ml-2 h-full flex flex-col justify-center gap-2">
          <Link href="/blog/0">
            <a>
              <h1 className="text-xl md:text-2xl text-dark font-bold cursor-pointer hover:underline duration-200 decoration-link">
                {title}
              </h1>
            </a>
          </Link>
          <p className="text-sm md:text-base text-lightDark line-clamp-4">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
