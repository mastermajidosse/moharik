export default function AboutPage() {
  return (
    <div className="mt-10 py-16 md:py-24">
      <section className="container">
        <h1 className="text-2xl md:text-3xl text-dark font-bold mb-6 text-center">
          About <span className="text-primary">Moharik</span>
        </h1>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide">
            We believe that innovations and new ideas can make this world
            better,and we also believe that we can make your unique idea or
            project POSSIBLE by showing your project to investors or supporters
            to take your project to the next level. Welcome to MOHARIK, the
            right place to make your dreams real.
          </p>
          <p className="text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide">
            Many small business owners in this world couldn&#39;t make their
            dreams come true,because they didn&#39;t have the financial
            opportunity to commercialize and grow their projects, MOHARIK gives
            you the opportunity to meet the investors and like minded creative
            people to get what you need to make your dream come true.
          </p>
        </div>
      </section>
      {/* pic section */}
      <section className="container my-16">
        <figure className="relative rounded-md overflow-hidden">
          <img
            src="https://www.gofundme.com/c/wp-content/uploads/2021/09/drone-photo-1.jpg"
            alt=""
          />
        </figure>
      </section>
    </div>
  );
}
