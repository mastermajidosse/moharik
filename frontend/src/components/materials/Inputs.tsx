import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  register: UseFormRegister<any>;
}

export default function Input({ label, name, register, ...rest }: InputProps) {
  return (
    <>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-dark"
      >
        {label}
      </label>
      <input
        className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
        {...rest}
        {...register(name)}
      />
    </>
  );
}
