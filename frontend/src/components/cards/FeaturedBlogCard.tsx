import Link from "next/link";
import { blogs } from "../../data/blogs";
export default function FeaturedBlogCard() {
  const { description, image, title } = blogs[0];
  return (
    <section className="relative w-full md:h-[480px] h-[300px]">
      <Link href="/blog/0">
        <a className="">
          <figure className="absolute top-0 right-0 w-6/12 md:w-8/12 h-full rounded-l-md shadow-lg cursor-pointer hover:shadow-primary-100/30 duration-200">
            <img
              className="w-full h-full object-cover rounded-l-md"
              src={image}
              alt={title}
            />
          </figure>
        </a>
      </Link>
      <div className="container h-full">
        <div className="w-5/12 md:w-3/12 ml-2 h-full flex flex-col justify-center gap-2">
          <Link href="/blog/0">
            <a>
              <h4 className="text-xl md:text-4xl text-dark font-bold cursor-pointer hover:underline duration-200 decoration-link">
                {title}
              </h4>
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
