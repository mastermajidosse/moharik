import clsx from "clsx";
import { useState } from "react";
import { ChevronIcon } from "./Icons";

export function FaqAccordion() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div
        onClick={() => setExpanded(!expanded)}
        className="bg-primary-50 p-2 md:p-3 rounded-md hover:bg-primary-100/30 cursor-pointer duration-200 flex items-center justify-between gap-2"
      >
        <p className="font-medium text-dark">
          How fundraising works on Project_Name
        </p>
        <ChevronIcon
          width="16"
          height="16"
          className={clsx("", {
            "rotate-90 duration-200": expanded,
            "rotate-0 duration-200": !expanded,
          })}
        />
      </div>
      <div
        className={clsx("overflow-hidden", {
          "mt-2 bg-primary-50/50 p-3 rounded-md h-fit duration-200": expanded,
          "h-0 duration-200 opacity-0": !expanded,
        })}
      >
        <p className="text-sm font-medium text-dark/75 leading-relaxed tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel voluptate
          impedit aliquam tempore adipisci non rem ab perferendis pariatur sit,
          asperiores, veritatis delectus officiis accusamus laborum, temporibus
          atque velit quibusdam!
        </p>
      </div>
    </>
  );
}
