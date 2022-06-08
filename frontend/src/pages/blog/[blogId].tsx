export default function SingleBlogPage() {
  return (
    <>
      <section className="w-full bg-light min-h-screen mt-10">
        <div className="container bg-white min-h-screen py-28 flex flex-col gap-12">
          <h1 className="text-2xl md:text-3xl text-dark font-bold text-center">
            Coronavirus Relief for Small Businesses: Six Ways to Get Help
          </h1>
          <figure className="w-full h-[360px]">
            <img
              className="w-full h-full object-cover rounded-xl shadow-lg"
              src="https://www.gofundme.com/c/wp-content/uploads/2020/03/Man-Behind-The-Counter.jpg?w=1280"
              alt=""
            />
          </figure>
          <div className="flex flex-col gap-4">
            {Array.from(Array(3)).map((_, idx) => (
              <p
                key={idx}
                className="text-lightDark font-medium leading-relaxed tracking-wide"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas libero esse veritatis architecto vero. Dolorem cumque
                quod dolore voluptates vel libero! Dolores adipisci nostrum
                consequuntur minima beatae sapiente iusto perspiciatis nam at
                officiis quisquam aperiam reiciendis labore alias quam aliquam,
                optio illo ipsa consequatur ipsam error, praesentium cum porro!
                Voluptatibus!
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
