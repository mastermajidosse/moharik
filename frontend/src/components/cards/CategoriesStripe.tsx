import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function CategoriesStripe() {
  const { query } = useRouter();
  return (
    <>
      <ul className="w-fit mx-auto flex flex-wrap justify-center md:justify-between gap-y-4 gap-x-2">
        {/* {categoriesWithColors.map(({ color, name }, idx) => (
        ))} */}
        <li className="">
          <Link href={`/projects`}>
            <a
              className={clsx(
                "capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 hover:text-white  duration-500",
                {
                  "bg-[#15b2c0] text-white": !query?.category,
                  "hover:bg-[#15b2c0] bg-[#15b2c0]/10": query?.category,
                }
              )}
            >
              All
            </a>
          </Link>
        </li>
        <li className="">
          <Link href={`/projects?category=thrive`}>
            <a
              className={clsx(
                "capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 duration-500",
                {
                  "text-white bg-[#2ECC71] ": query?.category === "thrive",
                  "hover:text-white hover:bg-[#2ECC71] bg-[#2ECC71]/10":
                    query?.category !== "thrive",
                }
              )}
            >
              thrive
            </a>
          </Link>
        </li>
        <li className="">
          <Link href={`/projects?category=invention`}>
            <a
              className={clsx(
                "capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 duration-500",
                {
                  "text-white bg-[#b1817f]": query?.category === "invention",
                  "hover:text-white hover:bg-[#b1817f] bg-[#b1817f]/10":
                    query?.category !== "invention",
                }
              )}
            >
              invention
            </a>
          </Link>
        </li>
        <li className="">
          <Link href={`/projects?category=big`}>
            <a
              className={clsx(
                "capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 duration-500",
                {
                  "text-white bg-[#8E44AD]": query?.category === "big",
                  "hover:text-white hover:bg-[#8E44AD] bg-[#8E44AD]/10":
                    query?.category !== "big",
                }
              )}
            >
              big
            </a>
          </Link>
        </li>
        <li className="">
          <Link href={`/projects?category=digital`}>
            <a
              className={clsx(
                "capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 duration-500",
                {
                  "text-white bg-[#004afb]": query?.category === "digital",
                  "hover:text-white hover:bg-[#004afb] bg-[#004afb]/10":
                    query?.category !== "digital",
                }
              )}
            >
              digital
            </a>
          </Link>
        </li>
        <li className="">
          <Link href={`/projects?category=incubator`}>
            <a
              className={clsx(
                "capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 duration-500",
                {
                  "text-white bg-[#34495E]": query?.category === "incubator",
                  "hover:text-white hover:bg-[#34495E] bg-[#34495E]/10":
                    query?.category !== "incubator",
                }
              )}
            >
              incubator
            </a>
          </Link>
        </li>
        <li className="">
          <Link href={`/projects?category=competition`}>
            <a
              className={clsx(
                "capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 duration-500",
                {
                  "text-white bg-[#ff9b59]": query?.category === "competition",
                  "hover:text-white hover:bg-[#ff9b59] bg-[#ff9b59]/10":
                    query?.category !== "competition",
                }
              )}
            >
              competition
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
}
