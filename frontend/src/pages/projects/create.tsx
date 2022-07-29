import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import "react-quill/dist/quill.snow.css";

import Input from "../../components/materials/Inputs";
import FilesUploader from "../../components/materials/FilesUploader";
import { client } from "../../utils/api";
import { getToken } from "../../utils/getToken";
import CategoriesInput from "../../components/materials/CategoriesInput";
import { cloudinary_endpoint, IUploadedFileRes } from "../../utils/uploadImage";

export interface ProjectFrom {
  title: string;
  desc: string;
  category: string[] | string;
  price: string;
  link: string;
  deadline: Date;
  images: File[];
}

const schema = yup
  .object({
    title: yup.string().min(10).required(),
    link: yup.string().required(),
    desc: yup.string().required(),
    category: yup.string().required(),
    price: yup.number().positive().min(1).required(),
    deadline: yup.date().required(),
    images: yup.array().min(1).required(),
  })
  .required();

export default function CreateProjectPage() {
  const { push } = useRouter();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFrom>({
    resolver: yupResolver(schema),
  });

  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  async function onSubmit(inputs: ProjectFrom) {
    setLoading(true);
    try {
      // upload images
      const images: string[] = [];
      await inputs.images.forEach(async (file, idx) => {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "");
        fd.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME || ""
        );
        const { data } = await axios.post<IUploadedFileRes>(
          cloudinary_endpoint,
          fd
        );
        images.push(data?.url || "/assets/images/placeholder.png");
        // create projects
        if (idx == inputs.images.length - 1) {
          const { data: projectData } = await client.post(
            "/posts",
            {
              ...inputs,
              images,
              supportLink: "",
            },
            {
              headers: {
                Authorization: `Bearer ${getToken() || ""}`,
              },
            }
          );
          setLoading(false);
          toast.success("Project has been created successfully.");
          push("/projects");
        }
      });
    } catch (error) {
      toast.error("Something went wrong!!!");
      setLoading(false);
      console.log(error);
    }
  }

  const watchCategory = watch("category");

  useEffect(() => {
    console.log("watchCategory: ", watchCategory);
  }, [watchCategory]);

  return (
    <>
      <Head>
        <title>Moharik | Create project</title>
      </Head>
      <section className="container mt-10 py-16 md:py-24 bg-white flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create a project
        </h1>
        {/*  */}
        <div className="min-h-screen md:w-2/5 md:mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="flex flex-col gap-4">
              <div className="">
                <Input
                  name="title"
                  register={register}
                  type="text"
                  label="Title"
                  required
                  error={
                    errors.title?.message
                      ? "Title is a required field."
                      : undefined
                  }
                />
              </div>
              <div className="">
                <CategoriesInput
                  required
                  error={
                    errors.category
                      ? " Category is a required field."
                      : undefined
                  }
                  getValues={getValues}
                  register={register}
                />
              </div>
              <div className="">
                <Input
                  name="link"
                  register={register}
                  type="text"
                  label="Project Link"
                  required
                  error={errors.link?.message}
                />
              </div>
              <div className="">
                <Input
                  name="deadline"
                  register={register}
                  type="date"
                  label="Deadline"
                  required
                  error={
                    errors.deadline?.message
                      ? "Select a valid deadline"
                      : undefined
                  }
                />
              </div>
              <div className="">
                <Input
                  name="price"
                  register={register}
                  type="number"
                  min={0}
                  label="Price"
                  required
                  error={
                    errors.price?.message ? "Price should be > 0 " : undefined
                  }
                />
              </div>
              <div className="">
                <FilesUploader
                  error={
                    errors?.images ? "Upload at least one image." : undefined
                  }
                  required
                  setValue={setValue}
                />
              </div>
              <div className="">
                <>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-dark"
                  >
                    Description <span className="text-red-500">*</span>{" "}
                    {errors.desc?.message && (
                      <span className="text-xs font-light text-red-500">
                        Description is required
                      </span>
                    )}
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={getValues("desc")}
                    onChange={(e) => setValue("desc", e)}
                  />
                </>
              </div>
              <button
                onClick={() => console.log("errors: ", errors)}
                type="submit"
                className="w-full flex items-center justify-center hover:bg-primary-600 bg-primary-500 text-light font-medium text-lg p-2.5"
              >
                {isLoading ? (
                  <>
                    <svg
                      role="status"
                      className="inline w-5 h-5 mr-2 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req: { cookies },
  locale,
}) => {
  try {
    if (!cookies.currentUser) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "home-page",
        "newsletter",
        "project",
        "common",
        "footer",
        "header",
      ])),
    },
  };
};
