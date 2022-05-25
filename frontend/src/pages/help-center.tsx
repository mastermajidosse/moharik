import { SearchIcon } from "../components/materials/Icons";
import { FaqAccordion } from "../components/materials/FaqAccordion";
import { SquaredSolidButton } from "../components/materials/Buttons";

export default function HelpCenterPage() {
  return (
    <div className="py-16 md:py-20">
      {/* search section */}
      <section className="bg-secondary-50 h-[200px]">
        <div className="container h-full flex flex-col items-center justify-center gap-2">
          <h1 className="text-dark font-bold text-2xl md:text-3xl">
            How can we help you?
          </h1>
          <div className="relative w-full flex justify-center items-center">
            <input
              className="w-full md:w-1/2 outline-none rounded-md p-2.5 md:p-3 shadow-md shadow-secondary-300/10"
              placeholder="Search term"
            />
            <SearchIcon
              width="20"
              height="20"
              className="w-fit text-lightDark absolute right-3 md:right-[26%]"
            />
          </div>
        </div>
      </section>
      {/* FAQ section */}
      <section className="container my-8">
        <h2 className="text-dark font-bold text-2xl md:text-3xl text-center mb-4">
          FAQ
        </h2>
        {/* accordions */}
        <ul className="grid grid-cols-1 gap-4">
          {Array.from(Array(6)).map((_, idx) => (
            <li key={idx} className="">
              <FaqAccordion />
            </li>
          ))}
        </ul>
      </section>
      {/* more help section */}
      <section className="bg-secondary-50 py-8">
        <div className="container">
          <h2 className="text-dark font-bold text-2xl md:text-3xl text-center mb-4">
            We&#39;re here for you
          </h2>
          <p className="text-center font-medium text-dark/75 text-sm">
            Still need help? Just click the button below and we&#39;ll provide
            you with personalized support and connect you with one of our
            Customer Care agents if needed.
          </p>
          <div className="flex justify-center mt-4">
            <SquaredSolidButton className="mt-0 py-1 px-6 rounded-[0.25rem] bg-secondary-500 text-white shadow-md shadow-lightDark/20 hover:bg-secondary-600 duration-300">
              <span className="text-center font-medium tracking-wide leading-relaxed">
                Contact us
              </span>
            </SquaredSolidButton>
          </div>
        </div>
      </section>
    </div>
  );
}
