import { useEffect } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

import Input from "../../../components/materials/Inputs";
import FilesUploader from "../../../components/materials/FilesUploader";
import { client } from "../../../utils/api";
import { getToken } from "../../../utils/getToken";
import CategoriesInput from "../../../components/materials/CategoriesInput";
import {
  cloudinary_endpoint,
  IUploadedFileRes,
} from "../../../utils/uploadImage";
import { IProject } from "../../../interfaces/project";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export interface ProjectFrom {
  title: string;
  desc: string;
  category: string[] | string;
  price: string;
  deadline: Date;
  images: File[];
}

const schema = yup
  .object({
    title: yup.string().min(10).required(),
    desc: yup.string().required(),
    category: yup.string().required(),
    price: yup.number().positive().min(1).required(),
    deadline: yup.date().required(),
    images: yup.array().min(1).required(),
  })
  .required();

export default function EditeProjectPage({
  project,
}: {
  project: ProjectFrom;
}) {
  const { push, query } = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFrom>({
    defaultValues: {
      category: project.category,
      deadline: project.deadline,
      desc: project.desc,
      images: project.images,
      price: project.price,
      title: project.title,
    },
    // resolver: yupResolver(schema),
  });

  console.log("query: ", query);

  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  async function onSubmit(inputs: ProjectFrom) {
    console.log("inputs: ", inputs);

    try {
      // upload images
      const images: string[] = [];
      if (inputs.images.length > 0) {
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
              `/posts/${query.peojectId}/update`,
              {
                ...inputs,
                images,
              },
              {
                headers: {
                  Authorization: `Bearer ${getToken() || ""}`,
                },
              }
            );
            toast.success("Project has been edited successfully.");
            push(`/projects/${query.peojectId}`);
          }
        });
      } else {
        await client.post(
          `/posts/${query.projectId}/update`,
          {
            ...inputs,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken() || ""}`,
            },
          }
        );
        toast.success("Project has been edited successfully.");
        push(`/projects/${query.projectId}`);
      }
    } catch (error) {
      toast.error("Something went wrong!!!");
      console.log(error);
    }
  }

  const watchCategory = watch("category");

  useEffect(
    () => console.log("watchCategory: ", watchCategory),
    [watchCategory]
  );

  return (
    <>
      <Head>
        <title>Moharik | Edite project</title>
      </Head>
      <section className="container mt-10 py-16 md:py-24 bg-white flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-8">Edite a project</h1>
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
                  previews={project.images || []}
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
                className="w-full hover:bg-primary-600 bg-primary-500 text-light font-medium text-lg p-2.5"
              >
                Update
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
  query,
  locale,
}) => {
  const { projectId } = query;
  let project: IProject | Record<string, never> = {};
  try {
    if (!cookies.currentUser) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const { data } = await client.get(`/posts/${projectId}`);
    project = data;
    console.log("project: ", project);
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      project,
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
