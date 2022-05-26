import { SquaredSolidButton } from "../components/materials/Buttons";

export default function ProfilePage() {
  return (
    <div className="mt-20 bg-light">
      {/* cover */}
      <section className="w-full h-72">
        <figure className="relative __pattern w-full h-full flex justify-center items-center group cursor-pointer">
          <div className="absolute top-0 left-0 w-full h-full z-0 bg-dark/30 invisible group-hover:visible duration-200" />
          <div className="text-center flex flex-col justify-center items-center group cursor-pointer text-white relative z-10 invisible group-hover:visible duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="95"
              height="95"
              fill="currentColor"
              className="bi bi-camera"
              viewBox="0 0 16 16"
            >
              <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
              <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
            </svg>
            <p className="font-bold text-lg">Change your cover image</p>
          </div>
        </figure>
      </section>
      {/* main */}
      <section className="container h-screen grid grid-cols-12 gap-4 py-4 bg-white">
        <aside className="hidden md:flex md:col-span-2 h-full bg-light rounded-md border-2 border-light p-2">
          <div className="w-full flex flex-col gap-2 items-center">
            <figure className="relative __pattern w-28 h-28 mx-auto rounded-full ring-2 ring-primary-100 shadow-md"></figure>
            <p className="text-lg font-medium text-dark">Username</p>
          </div>
        </aside>
        <article className="col-span-full md:col-span-10 h-full bg-light rounded-md border-2 border-light p-2">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="font-medium text-lightDark text-lg text-center -mb-4">
              There is no project!
              <br /> create one:
            </p>
            <SquaredSolidButton>
              <span className="">Create project</span>
            </SquaredSolidButton>
          </div>
        </article>
      </section>
    </div>
  );
}
