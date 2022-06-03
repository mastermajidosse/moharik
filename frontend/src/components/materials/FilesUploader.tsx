import { ChangeEvent, useEffect, useState } from "react";
import {
  useFieldArray,
  UseFieldArrayAppend,
  useForm,
  UseFormSetValue,
} from "react-hook-form";
import { ProjectFrom } from "../../pages/projects/create";
import { CloseIcon } from "./Icons";

export default function FilesUploader({
  setValue,
}: {
  setValue: UseFormSetValue<ProjectFrom>;
}) {
  const { control, watch } = useForm<{ images: File[] | [] }>({
    defaultValues: { images: [] },
  });
  const { remove, append } = useFieldArray({
    control,
    name: "images",
  });

  const watcher = watch("images");

  useEffect(() => {
    console.log("watcher: ", watcher);
    setValue("images", watcher);
  }, [setValue, watcher]);

  return (
    <>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-dark"
      >
        Images
      </label>
      <div className="w-full bg-light rounded grid grid-cols-4 gap-2 p-4">
        <FileInput append={append} remove={() => remove(0)} />
        <FileInput append={append} remove={() => remove(1)} />
        <FileInput append={append} remove={() => remove(2)} />
        <FileInput append={append} remove={() => remove(3)} />
      </div>
    </>
  );
}

function FileInput({
  append,
  remove,
}: {
  remove: () => void;
  append: UseFieldArrayAppend<
    {
      images: any[];
    },
    "images"
  >;
}) {
  const [preview, setPreview] = useState<null | string>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      append(e.target.files[0]);
      const pv = URL.createObjectURL(e.target.files[0]);
      setPreview(pv);
    }
  }

  function handleRemove() {
    setPreview(null);
    remove();
  }

  useEffect(() => {
    console.log(preview);
  }, [preview]);

  return (
    <>
      {preview ? (
        <div className="relative group h-20 w-20 bg-primary-50/50 rounded border-2 border-dashed border-primary-500 flex justify-center items-center">
          <figure className="w-full h-full">
            <img className="w-full h-full object-contain" src={preview} />
            <CloseIcon
              onClick={handleRemove}
              className="absolute top-0.5 right-0.5 bg-red-500 text-white p-1 rounded-full hover:p-0.5 duration-200 cursor-pointer"
            />
          </figure>
        </div>
      ) : (
        <div className="relative group h-20 w-20 bg-primary-50/50 rounded border-2 border-dashed border-primary-500 flex justify-center items-center">
          <input
            type="file"
            className="absolute z-10 bg-red-400/40 opacity-0 w-full h-full cursor-pointer"
            onChange={handleChange}
          />
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-cloud-upload text-primary-600 group-hover:scale-105 duration-300"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
