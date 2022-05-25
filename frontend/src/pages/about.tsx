export default function AboutPage() {
  return (
    <div className="mt-10 py-16 md:py-24">
      <section className="container">
        <h1 className="text-2xl md:text-3xl text-dark font-bold mb-6 text-center">
          About PROJECT_NAME
        </h1>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide">
            There’s a part of every one of us that dreams of a better world.
            That spark of inspiration to help a person, fix a neighborhood, or
            even change a nation. At PROJECT_NAME, we believe your inspiration
            should be shared with everyone. Because that is how change happens.
          </p>
          <p className="text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide">
            That’s why we make it easy to inspire the world and turn compassion
            into action. By giving people the tools they need to capture and
            share their story far and wide, we have built a community of more
            than 50 million donors and helped organizers raise over $5
            billion—and we are just getting started.
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
      {/* more info */}
      <section className="container">
        <h2 className="text-center text-2xl text-dark font-bold mb-6">
          More About PROJECT_NAME
        </h2>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide">
            There’s a part of every one of us that dreams of a better world.
            That spark of inspiration to help a person, fix a neighborhood, or
            even change a nation. At PROJECT_NAME, we believe your inspiration
            should be shared with everyone. Because that is how change happens.
          </p>
          <p className="text-lightDark font-medium text-sm md:text-base leading-relaxed tracking-wide">
            That’s why we make it easy to inspire the world and turn compassion
            into action. By giving people the tools they need to capture and
            share their story far and wide, we have built a community of more
            than 50 million donors and helped organizers raise over $5
            billion—and we are just getting started.
          </p>
        </div>
      </section>
    </div>
  );
}
