export default function HowItWorksPage() {
  return (
    <section className="container min-h-screen">
      {/* page title */}
      <div className="flex flex-col gap-2 text-center justify-center items-center">
        <h1 className="text-4xl text-dark font-bold mb-4">
          Lorem ipsum dolor sit
        </h1>
        <p className="w-3/4 mx-auto text-lg text-lightDark leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          hic eligendi a tempora molestias labore officiis similique amet
          obcaecati impedit.
        </p>
      </div>
      {/* page body */}
      <div className="h-80" />
      {/* page CTO */}
      <div className="flex flex-col gap-2 text-center justify-center items-center">
        <h2 className="text-2xl text-dark font-bold mb-4">
          Lorem ipsum dolor sit
        </h2>
        <p className="w-3/4 mx-auto text-lg text-lightDark leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          hic eligendi a tempora molestias labore officiis similique amet
          obcaecati impedit.
        </p>
        <button className="mt-8 py-3 px-6 text-center rounded-[0.25rem] bg-primary-500 text-white font-medium tracking-wide leading-relaxed text-lg shadow-md shadow-lightDark/20 hover:bg-primary-600 duration-300">
          Learn more
        </button>
      </div>
    </section>
  );
}
