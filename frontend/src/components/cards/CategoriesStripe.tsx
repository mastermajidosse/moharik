import clsx from "clsx";
import { useState } from "react";
import { categoriesWithColors } from "../../data/categories";
export default function CategoriesStripe() {
  const [active, setactive] = useState(0);

  return (
    <>
      <ul className="w-fit mx-auto flex flex-wrap justify-center md:justify-between gap-y-4 gap-x-2">
        {/* {categoriesWithColors.map(({ color, name }, idx) => (
        ))} */}
        <li className="">
          <a
            className={`capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 hover:text-white hover:bg-[#f28944] bg-[#f28944]/10 duration-500`}
          >
            thrive
          </a>
        </li>
        <li className="">
          <a
            className={`capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 hover:text-white hover:bg-[#2ECC71] bg-[#2ECC71]/10 duration-500`}
          >
            invention
          </a>
        </li>
        <li className="">
          <a
            className={`capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 hover:text-white hover:bg-[#8E44AD] bg-[#8E44AD]/10 duration-500`}
          >
            big
          </a>
        </li>
        <li className="">
          <a
            className={`capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 hover:text-white hover:bg-[#004afb] bg-[#004afb]/10 duration-500`}
          >
            digital
          </a>
        </li>
        <li className="">
          <a
            className={`capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 hover:text-white hover:bg-[#34495E] bg-[#34495E]/10 duration-500`}
          >
            incubator
          </a>
        </li>
        <li className="">
          <a
            className={`capitalize cursor-pointer px-4 py-2 font-medium rounded-full text-sm text-dark/75 hover:text-white hover:bg-[#F4D03F] bg-[#F4D03F]/10 duration-500`}
          >
            competition
          </a>
        </li>
      </ul>
    </>
  );
}
