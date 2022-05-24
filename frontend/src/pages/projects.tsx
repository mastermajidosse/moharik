import CategoriesStripe from "../components/cards/CategoriesStripe";
import ProjectCard from "../components/cards/ProjectCard";

export default function ProjectsPage() {
  return (
    <>
      <section className="container mt-10 py-16 md:py-24 bg-white flex flex-col gap-12">
        <div className="">
          <div className="mb-8">
            <h2 className="text-2xl font-medium">Fundraising categories</h2>
            <p className="w-3/4 text-lightDark mt-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
              dignissimos accusantium accusamus ut voluptatum iste modi
              perferendis facere suscipit vero.
            </p>
          </div>
          <CategoriesStripe />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from(Array(12)).map((_, idx) => (
            <ProjectCard key={idx} />
          ))}
        </div>
        <button className="w-fit mx-auto px-6 py-2 border-primary border text-lg font-medium text-primary hover:border-primary-600 hover:text-primary-600 duration-200 rounded-md">
          Show more
        </button>
      </section>
    </>
  );
}
