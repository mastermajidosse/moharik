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
    "Community",
  ];
  return (
    <>
      <ul className="flex flex-wrap justify-between">
        {categories.map((item, idx) => (
          <li key={idx} className="">
            <a
              onClick={() => setactive(idx)}
              className={clsx(
                "cursor-pointer px-3 py-2 font-medium rounded-full",
                {
                  "text-dark hover:text-white hover:bg-primary-500 duration-200":
                    idx > 0,
                  "text-white bg-primary-500": idx === active,
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
