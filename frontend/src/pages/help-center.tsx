import Head from "next/head";
import { useForm } from "react-hook-form";

import { SearchIcon } from "../components/materials/icons";
import { FaqAccordion } from "../components/materials/FaqAccordion";
import { SquaredSolidButton } from "../components/materials/Buttons";
import Input from "../components/materials/Inputs";
import { toast } from "react-toastify";

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

  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  async function onSubmit() {
    try {
      toast.success(
        "Thanks for contacting us, We will respond you as soon as possible."
      );
    } catch (error) {
      console.log(error);
    }
  }

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
      <section className="container mt-16 mb-32">
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
      <section className="bg-secondary-50 py-12">
        <div className="container">
          <h2 className="text-dark font-bold text-2xl md:text-3xl text-center mb-4">
            We&#39;re here for you
          </h2>
          <p className="w-full md:w-3/5 mx-auto text-center font-medium text-dark/75 text-sm">
            Still need help? Just click the button below and we&#39;ll provide
            you with personalized support and connect you with one of our
            Customer Care agents if needed.
          </p>
          <div className="w-full flex justify-center mt-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full md:w-1/3 mx-auto flex flex-col gap-6"
            >
              <div className="">
                <Input
                  name="name"
                  register={register}
                  label="Full Name"
                  type="name"
                  required
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                />
              </div>
              <div className="">
                <Input
                  name="email"
                  register={register}
                  label="Email address"
                  type="email"
                  required
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2 py-3"
                />
              </div>
              <div className="">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-dark"
                >
                  Description
                </label>
                <textarea
                  rows={6}
                  required
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
                  {...register("description")}
                />
              </div>
              <SquaredSolidButton className="mt-0 w-fit mx-auto py-1 px-6 rounded-[0.25rem] bg-secondary-500 text-white shadow-md shadow-lightDark/20 hover:bg-secondary-600 duration-300">
                <button
                  type="submit"
                  className="text-center font-medium tracking-wide leading-relaxed"
                >
                  Contact us
                </button>
              </SquaredSolidButton>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
