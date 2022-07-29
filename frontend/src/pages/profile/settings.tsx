import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { toast } from "react-toastify";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { ICurrentUser } from "../../interfaces/currentUser";
import { client } from "../../utils/api";
import ProfileAside from "../../components/asides/ProfileAside";
import Input from "../../components/materials/Inputs";
import { getToken } from "../../utils/getToken";

interface FormProps {
  name: string;
  email: string;
  country: string;
  phone: string;
}

export default function ProfileSettingsPage({
  myProfile,
}: {
  myProfile: ICurrentUser;
}) {
  const { t } = useTranslation("header");
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      name: myProfile.name,
      email: myProfile.email,
      phone: myProfile.phone,
      country: myProfile.country,
    },
  });

  const onSubmit = async (inputs: FormProps) => {
    setLoading(true);
    console.log(inputs);
    try {
      const {} = await client.put(
        "/users/profile",
        { ...inputs, _id: myProfile._id },
        {
          headers: {
            Authorization: `Bearer ${getToken() || ""}`,
          },
        }
      );
      setLoading(false);
      toast.success("Profile has been updated successfully.");
    } catch (error) {
      toast.error("Something went wrong!!!");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="mt-20 bg-light ">
      <Head>
        <title>Moharik | Profile</title>
      </Head>
      {/* cover */}
      <section className="w-full h-72">
        <figure className="relative __pattern w-full h-full flex justify-center items-center group cursor-pointer">
          <div className="absolute top-0 left-0 w-full h-full z-0 bg-dark/30 invisible group-hover:visible duration-200" />
          <div className="text-center flex flex-col justify-center items-center group cursor-pointer text-white relative z-10 invisible group-hover:visible duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="95"
              height="95"
              fill="currentColor"
              className="bi bi-camera"
              viewBox="0 0 16 16"
            >
              <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
              <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
            </svg>
            <p className="font-bold text-lg">{t("change_cover")}</p>
          </div>
        </figure>
      </section>
      {/* main */}
      <section className="container min-h-screen grid grid-cols-12 gap-4 py-4 bg-white">
        {/* aside */}
        <ProfileAside
          name={myProfile.name}
          email={myProfile.email}
          country={myProfile.country}
        />
        {/* setttings section */}
        <article className="col-span-full md:col-span-10 h-full bg-light rounded-md border-2 border-light p-4">
          {/*  */}
          <h1 className="text-xl font-medium text-dark border-b pb-4 mb-8">
            Edit your profile information:
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <Input name="name" register={register} label="Full name" />
              </div>
              <div className="">
                <Input name="email" register={register} label="Email" />
              </div>
              <div className="">
                <Input name="phone" register={register} label="Phone" />
              </div>
              <div className="">
                <Input name="country" register={register} label="Country" />
              </div>
            </div>
            <div className="w-full flex justify-end mt-4">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center"
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
                    Submitting...
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </form>
        </article>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req: { cookies },
  locale,
}) => {
  let myProfile: ICurrentUser | any = {};
  try {
    if (!cookies.currentUser) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // get profile data
    const { data } = await client.get<ICurrentUser>("/users/profile", {
      headers: {
        Authorization: `Bearer ${
          (JSON.parse(cookies.currentUser) as ICurrentUser)?.token || ""
        }`,
      },
    });
    myProfile = data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      myProfile,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "footer",
        "header",
      ])),
    },
  };
};
