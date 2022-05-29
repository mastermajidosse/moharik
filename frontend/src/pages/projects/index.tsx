import CategoriesStripe from "../../components/cards/CategoriesStripe";
import ProjectCard from "../../components/cards/ProjectCard";

export default function ProjectsPage() {
  return (
    <>
      <section className="container mt-10 py-16 md:py-24 bg-white flex flex-col">
        <div className="">
          <div className="mb-14 text-center">
            <h1 className="text-3xl font-black text-dark">
              Fundraising categories
            </h1>
            <p className="w-full md:w-3/4 md:mx-auto text-lightDark mt-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
              dignissimos accusantium accusamus ut voluptatum iste modi
              perferendis facere suscipit vero.
            </p>
          </div>
          <CategoriesStripe />
        </div>
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
          {Array.from(Array(12)).map((_, idx) => (
            <ProjectCard key={idx} />
          ))}
        </div>
        <button className="w-fit mx-auto px-6 py-2 border-secondary border text-lg font-medium text-secondary hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-600 duration-200 rounded-md">
          Show more
        </button>
      </section>
    </>
  );
}
