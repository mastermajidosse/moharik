import ProjectCard from "../components/materials/ProjectCard";

export default function ProjectsPage() {
  return (
    <>
      <section className="mt-20 py-16 md:py-24 bg-white">
        <div className="container grid grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from(Array(12)).map((_, idx) => (
            <ProjectCard key={idx} />
          ))}
        </div>
      </section>
    </>
  );
}
