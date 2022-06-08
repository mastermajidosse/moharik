import Input from "../../components/materials/Inputs";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FilesUploader from "../../components/materials/FilesUploader";
import { GetServerSideProps } from "next";
import { client } from "../../utils/api";
import { getToken } from "../../utils/getToken";
import CategoriesInput from "../../components/materials/CategoriesInput";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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
  })
  .required();

export default function CreateProjectPage() {
  const { push } = useRouter();
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

  async function onSubmit(inputs: ProjectFrom) {
    try {
      const { data } = await client.post(
        "/posts",
        {
          ...inputs,
          images: [
            "http://res.cloudinary.com/senyou/image/upload/v1653736690/htm20wjsglpnepacf2qj.jpg",
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${getToken() || ""}`,
          },
        }
      );
      console.log("data posted: ", data);
      toast.success("Project has been created successfully.");
      push("/projects");
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
                />
              </div>
              <div className="">
                <CategoriesInput getValues={getValues} register={register} />
              </div>
              <div className="">
                <Input
                  name="deadline"
                  register={register}
                  type="date"
                  label="Deadline"
                  required
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
                />
              </div>
              <div className="">
                <FilesUploader setValue={setValue} />
              </div>
              <div className="">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-dark"
                >
                  Description
                </label>
                <textarea
                  rows={6}
                  required
                  className="outline-none bg-gray-50 border border-gray-300 text-dark text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
                  {...register("desc")}
                />
              </div>
              <button
                onClick={() => console.log("errors: ", errors)}
                type="submit"
                className="w-full hover:bg-primary-600 bg-primary-500 text-light font-medium text-lg p-2.5"
              >
                Create
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
    props: {},
  };
};
