export default function FeaturedBlogCard() {
  return (
    <section className="relative w-full h-[480px]">
      <figure className="absolute top-0 right-0 w-6/12 md:w-8/12 h-full rounded-l-md shadow-lg cursor-pointer hover:shadow-primary-100/30 duration-200">
        <img
          className="w-full h-full object-cover rounded-l-md"
          src="https://www.gofundme.com/c/wp-content/uploads/2020/03/GoFundMe_JaneKhan_043.jpg"
          alt=""
        />
      </figure>
      <div className="container h-full">
        <div className="w-5/12 md:w-3/12 ml-2 h-full flex flex-col justify-center gap-2">
          <h1 className="text-xl md:text-2xl text-dark font-bold cursor-pointer hover:underline duration-200 decoration-link">
            Fundraising for Coronavirus Relief: How You Can Help the Fight
          </h1>
          <p className="text-sm md:text-base text-lightDark line-clamp-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            saepe temporibus voluptates eaque ea, cum vero incidunt labore rerum
            distinctio!
          </p>
        </div>
      </div>
    </section>
  );
}
