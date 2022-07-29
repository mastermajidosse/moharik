import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Portal from "./Portal";
import { CloseIcon } from "../materials/icons";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useLockedBody } from "../../hooks/useLockBodyScroll";
import Input from "../materials/Inputs";
import { client } from "../../utils/api";
import { getToken } from "../../utils/getToken";

interface ModalProps {
  children: JSX.Element;
  contact: any;
}

const schema = yup
  .object({
    title: yup.string().required(),
    desc: yup.string().required(),
  })
  .required();

export default function ReportModal({ children }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      desc: "",
    },
    resolver: yupResolver(schema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const { query } = useRouter();
  const [locked, setLocked] = useLockedBody();

  useOnClickOutside(modalRef, () => {
    setIsOpen(false);
    setLocked(false);
  });

  function closeModal() {
    setIsOpen(false);
    setLocked(false);
  }
  function openModal() {
    if (!getToken()) {
      return toast.info("You must log in first to report.");
    }
    window.scrollTo({ behavior: "auto", top: 0 });
    setIsOpen(true);
    setLocked(true);
  }

  async function onSubmit(inputs: { title: string; desc: string }) {
    try {
      // console.log(query);
      // console.log(inputs);
      await client.post(`/posts/${query.projectId}/report`, inputs, {
        headers: {
          Authorization: `Bearer ${getToken() || ""}`,
        },
      });
      closeModal();
      reset();
      toast.success(
        "Your report is submitted. We will review it as soon as possible."
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  }

  return (
    <>
      <div onClick={openModal} className="w-full">
        {children}
      </div>
      {isOpen && (
        <Portal selector="#modal">
          {/* overlay */}
          <div className="absolute bottom-0 top-0 left-0 right-0 z-50 bg-black/70 flex justify-center items-center">
            {/* modal */}
            <div
              ref={modalRef}
              className="relative w-5/6 md:w-2/5  bg-white rounded-md p-4"
            >
              {/* close btn */}
              <CloseIcon
                onClick={closeModal}
                className="absolute top-4 right-4 bg-light text-dark w-8 h-8 p-1.5 rounded-full hover:scale-105 cursor-pointer"
              />
              {/* modal body */}
              <div className="w-full h-full flex flex-col gap-4">
                {/* modal header */}
                <div className="pt-10">
                  <h2 className="text-dark font-bold text-2xl">Report</h2>
                  <p className="text-sm text-lightDark"></p>
                </div>
                <div className="flex-1 flex flex-col justify-center ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      name="title"
                      register={register}
                      label="Title"
                      required
                      error={errors.title?.message}
                    />
                    <div className="my-4">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-dark"
                      >
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={6}
                        className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
                        {...register("desc")}
                      />
                      {errors.desc && (
                        <span className="text-xs text-red-500">
                          {errors.desc.message}
                        </span>
                      )}
                    </div>
                    {/* submit btn */}
                    <button
                      onClick={() => console.log("errors: ", errors)}
                      type="submit"
                      className="w-full flex items-center justify-center hover:bg-primary-600 bg-primary-500 text-light font-medium text-lg p-2.5"
                    >
                      Report
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
