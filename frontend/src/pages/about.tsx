import Head from "next/head";
export default function AboutPage() {
  return (
    <div className="container mt-10 py-16 md:py-24">
      <Head>
        <title>Moharik | About</title>
      </Head>
      <section className="">
        <h1 className="text-2xl md:text-3xl text-dark font-bold mb-6 text-center">
          About <span className="text-primary">Moharik</span>
        </h1>
        <p className="w-full md:w-9/10 mx-auto text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide text-center">
          We believe that innovations and new ideas can make this world
          better,and we also believe that we can make your unique idea or
          project <span className="decoration-primary underline">POSSIBLE</span>{" "}
          by showing your project to investors or supporters to take your
          project to the next level. Welcome to{" "}
          <span className="text-primary">MOHARIK</span>, the right place to make
          your dreams real.
        </p>
      </section>
      {/* pic section */}
      <section className="my-8 md:my-16 w-full md:w-2/3 mx-auto">
        <figure className="relative rounded-md overflow-hidden">
          <img src="/assets/images/about.jpg" alt="" />
        </figure>
      </section>
      <p className="w-full md:w-9/10 mx-auto text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide text-center">
        Many small business owners in this world couldn&#39;t make their dreams
        come true,because they didn&#39;t have the financial opportunity to
        commercialize and grow their projects,{" "}
        <span className="text-primary">MOHARIK</span> gives you the opportunity
        to meet the investors and like minded creative people to get what you
        need to make your dream come true.
      </p>
    </div>
  );
}
