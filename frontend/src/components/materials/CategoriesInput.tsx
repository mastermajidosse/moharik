import clsx from "clsx";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import useGetCategories from "../../hooks/useGetCategories";
import { ProjectFrom } from "../../pages/projects/create";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface CategoriesInputProps {
  register: UseFormRegister<ProjectFrom | any>;
  getValues: UseFormGetValues<ProjectFrom | any>;
  required?: boolean;
  error?: string;
}

export default function CategoriesInput({
  register,
  getValues,
  required = false,
  error,
}: CategoriesInputProps) {
  const { categories } = useGetCategories();
  return (
    <div className="">
      <label
        htmlFor="category"
        className="block mb-4 text-sm font-medium text-dark"
      >
        Category {required && <span className="text-red-500">*</span>}
        {error && (
          <span className="text-xs font-light text-red-500">{error}</span>
        )}
      </label>
      <div className="flex gap-2 flex-wrap justify-center gap-y-4">
        {categories.map((category, idx) => (
          <div key={idx} className="relative">
            <label
              className={clsx(
                "cursor-pointer px-4 py-2 font-medium rounded-full duration-500 text-sm capitalize",
                {
                  "text-lightDark hover:text-white hover:bg-primary-400 bg-slate-100 duration-500":
                    category._id !== getValues("category"),
                  "text-white bg-primary-400 duration-500":
                    category._id === getValues("category"),
                }
              )}
            >
              {category && category?.name?.en}
            </label>
            <input
              className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer "
              type="radio"
              value={category._id}
              {...register("category")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
