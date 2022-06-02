import clsx from "clsx";
import { useState } from "react";
export default function CategoriesStripe() {
  const [active, setactive] = useState(0);
  const categories = [
    "Family",
    "Creative",
    "Competition",
    "Community",
    "Business",
    "Environment",
    "Family",
    "Creative",
    "Competition",
  ];
  return (
    <>
      <ul className="w-fit mx-auto flex flex-wrap justify-center md:justify-between gap-y-4 gap-x-2">
        {categories.map((item, idx) => (
          <li key={idx} className="">
            <a
              onClick={() => setactive(idx)}
              className={clsx(
                "cursor-pointer px-4 py-2 font-medium rounded-full duration-500 text-sm",
                {
                  "text-lightDark hover:text-white hover:bg-primary-500 duration-500":
                    idx !== active,
                  "text-white bg-primary-500 duration-500": idx === active,
                }
              )}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
