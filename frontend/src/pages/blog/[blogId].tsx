import { useRouter } from "next/router";
import { blogs } from "../../data/blogs";

export default function SingleBlogPage() {
  const {
    query: { blogId },
  } = useRouter();
  const blog = blogs[(blogId as unknown as number) || 0];
  return (
    <>
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
            {Array.from(Array(3)).map((_, idx) => (
              <p
                key={idx}
                className="text-right text-lightDark font-medium leading-relaxed tracking-wide"
              >
                {blog?.description}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
