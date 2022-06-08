import { SearchIcon } from "../components/materials/icons";
import { FaqAccordion } from "../components/materials/FaqAccordion";
import { SquaredSolidButton } from "../components/materials/Buttons";
import Head from "next/head";

export default function HelpCenterPage() {
  const faqList = [
    {
      question: "What is Moharik?",
      answer:
        "Moharik is a way to raise money from a large number of people or individulas to provide the capital needed to get a company or project off the ground. Individuals, charities, or companies can create a campaign for specific causes and anyone can contribute",
    },
    {
      question: "What are the advantages of Moharik?",
      answer:
        "There are many advantages of Moharik; Community building and feedback collection, low overall risk for a potentially high reward, Helps you avoid giving up equity in your company, New opportunities and collaborations.",
    },
    {
      question: "I have a project. How can I apply?",
      answer:
        "create an account and add your project with all the details included",
    },
    {
      question: "How to create an account?",
      answer:
        "simply click on get started and fill up the data to register a new account",
    },
  ];
  return (
    <div className="py-16 md:py-20">
      <Head>
        <title>Moharik | Help center</title>
      </Head>
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
          {faqList.map((faq, idx) => (
            <li key={idx} className="">
              <FaqAccordion {...faq} />
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
