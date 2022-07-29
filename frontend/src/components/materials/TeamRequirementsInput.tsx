import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { TeamFrom } from "../../pages/teams/create";
import { useState, useEffect } from "react";

interface TeamRequirementsInputProps {
  error?: string;
  control: Control<TeamFrom, any>;
  register: UseFormRegister<TeamFrom>;
}

export default function TeamRequirementsInput({
  //   error,
  register,
  control,
}: TeamRequirementsInputProps) {
  const { fields, append, remove, update } = useFieldArray({
    name: "needs",
    control,
  });

  useEffect(() => {
    append({ title: "", description: "" });
  }, [append]);
  return (
    <div>
      <label
        htmlFor="needs"
        className="block mb-2 text-sm font-medium text-dark"
      >
        Requirements
      </label>
      {/* ==== */}
      <div className="flex flex-col gap-2 divide-y-2">
        {fields.map(({ description, id, title }, idx) => {
          return <InputNode index={idx} key={idx} register={register} />;
        })}
      </div>
      <div className="w-fit mx-auto py-6">
        <button
          type="button"
          onClick={() => append({ title: "", description: "" })}
          className="text-sm font-medium text-white bg-primary px-4 py-1 rounded-sm"
        >
          Add new requirement
        </button>
      </div>

      {/* ==== */}
      {/* {error && <span className="text-xs text-red-500">{error}</span>} */}
    </div>
  );
}

function InputNode({
  index,
  register,
}: {
  index: number;
  register: UseFormRegister<TeamFrom>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
        placeholder="Requirement title"
        {...register(`needs.${index}.title`)}
      />
      <textarea
        className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
        placeholder="Requirement description"
        {...register(`needs.${index}.description`)}
      />
    </div>
  );
}
