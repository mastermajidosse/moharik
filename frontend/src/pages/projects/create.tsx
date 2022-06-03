import Input from "../../components/materials/Inputs";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FilesUploader from "../../components/materials/FilesUploader";

export interface ProjectFrom {
  title: string;
  desc: string;
  category: string;
  price: string;
  deadline: Date;
  images: File[];
}

const schema = yup
  .object({
    title: yup.string().min(10).required(),
    desc: yup.string().min(40).required(),
    category: yup.string().required(),
    price: yup.number().positive().min(1).required(),
    deadline: yup.date().required(),
    // images: yup.object().required(),
  })
  .required();

export default function CreateProjectPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectFrom>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(inputs: ProjectFrom) {
    try {
      console.log(inputs);
      toast.success("Project has been created successfully.");
    } catch (error) {
      toast.error("Something went wrong!!!");
      console.log(error);
    }
  }
  return (
    <>
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
                />
              </div>
              <div className="">
                <Input
                  name="category"
                  register={register}
                  type="text"
                  label="Category"
                />
              </div>
              <div className="">
                <Input
                  name="deadline"
                  register={register}
                  type="date"
                  label="Deadline"
                />
              </div>
              <div className="">
                <Input
                  name="price"
                  register={register}
                  type="number"
                  min={0}
                  label="Price"
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
