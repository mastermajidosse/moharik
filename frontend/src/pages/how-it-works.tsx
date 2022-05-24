import { SquaredSolidButton } from "../components/materials/Buttons";
import {
  PiggyBankIcon,
  PersonPlusIcon,
  ChevronBarDownIcon,
  VideoPlayerIcon,
} from "../components/materials/icons";
export default function HowItWorksPage() {
  return (
    <div className="mt-20 py-16 md:py-24">
      {/* page title */}
      <section className="container flex flex-col gap-2 text-center justify-center items-center">
        <h1 className="text-4xl text-dark font-bold mb-4">How XXXXX Works</h1>
        <p className="w-3/4 mx-auto text-lg text-lightDark leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          hic eligendi a tempora molestias labore officiis similique amet
          obcaecati impedit.
        </p>
      </section>
      {/* video section */}
      <section className="container my-16">
        <figure className="relative rounded-md overflow-hidden">
          <img
            className="brightness-90"
            src="https://www.gofundme.com/c/wp-content/uploads/2021/03/how-it-works.png"
            alt=""
          />
          <div className="absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center">
            <VideoPlayerIcon className="text-white cursor-pointer hover:scale-110 duration-200 w-14 h-14 md:w-28 md:h-28" />
          </div>
        </figure>
      </section>
      {/* steps */}
      <section className="container py-8 md:py-16 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-y-12 md:gap-0">
        {Array.from(Array(3)).map((_, idx) => (
          <div className="w-fit mx-auto" key={idx}>
            <div className="flex mb-2 gap-2 items-center">
              {idx === 0 && <PiggyBankIcon width="28" height="28" />}
              {idx === 1 && <PersonPlusIcon width="28" height="28" />}
              {idx === 2 && <ChevronBarDownIcon width="28" height="28" />}
              <h3 className="text-xl font-medium text-dark mt-1">
                {idx + 1}. Start your fundraiser
              </h3>
            </div>
            <ul className="pl-14 flex flex-col gap-2 text-lightDark">
              <li className="list-disc">Set your fundraiser goal</li>
              <li className="list-disc">Tell your story</li>
              <li className="list-disc">Add a picture or video</li>
              <li className="list-disc">
                <a className="text-primary font-medium">
                  Watch a video tutorial
                </a>
              </li>
            </ul>
          </div>
        ))}
        {/* button */}
        <div className="col-span-full flex justify-center items-center py-0 md:py-4">
          <SquaredSolidButton>
            <span className="text-center font-medium tracking-wide leading-relaxed text-lg">
              Start a PROJECT_NAME
            </span>
          </SquaredSolidButton>
        </div>
      </section>
      {/* testimonials */}
      <section className="w-full min-h-[300px] bg-light mb-16 py-16 flex flex-col justify-center items-center gap-4">
        <p className="w-2/5 mx-auto text-center text-lightDark leading-relaxed tracking-wide font-medium text-lg">
          This website rocks! I raised close to $10,000 in less than 48 hours
          for my nephew’s medical needs, and your customer service was so prompt
          and helpful.”
        </p>
        {/* avatar */}
        <figure className="">
          <img
            className="w-20 h-20"
            src="https://www.gofundme.com/c/wp-content/uploads/2021/09/monica-s-testimonial1-1.png"
            alt=""
          />
        </figure>
        <h3 className="text-lg font-bold text-dark">Monica S.</h3>
        <p className="text-lightDark leading-relaxed tracking-wide font-medium">
          Raised $16,000 on GoFundMe
        </p>
      </section>
      {/* page CTO */}
      <section className="container flex flex-col gap-2 text-center justify-center items-center">
        <h2 className="text-2xl text-dark font-bold mb-4">
          Lorem ipsum dolor sit
        </h2>
        <p className="w-3/4 mx-auto text-lg text-lightDark leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          hic eligendi a tempora molestias labore officiis similique amet
          obcaecati impedit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Magnam, ullam!
        </p>
        <SquaredSolidButton>
          <span className="text-center font-medium tracking-wide leading-relaxed text-lg">
            Learn more
          </span>
        </SquaredSolidButton>
      </section>
    </div>
  );
}
