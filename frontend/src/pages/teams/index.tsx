import { GetServerSideProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TeamCard from "../../components/cards/TeamCard";
import { ITeam } from "../../interfaces/team";
import { client } from "../../utils/api";

export default function TeamsPage({ teams }: { teams: ITeam[] | [] }) {
  console.log(teams);

  return (
    <>
      <Head>
        <title>Moharik | Teams</title>
      </Head>
      <section className="container mt-10 py-16 md:py-24 bg-white flex flex-col">
        <div className="">
          <div className="mb-14 text-center">
            <h1 className="text-3xl font-black text-dark">
              Moharik <span className="text-primary">Teams</span>
            </h1>
            <p className="w-full md:w-3/5 md:mx-auto text-lightDark mt-8">
              In case you people to help and cannot find anyone to join you in
              your project you can reach us out to create a team for you and
              help you create a small group of people that want to work on same
              subject
            </p>
          </div>
        </div>
        {/* teams cards grid*/}
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-12">
          {teams.map(({ title, tags, _id, images, members, link }, idx) => (
            <TeamCard
              title={title}
              tags={tags}
              link={link}
              id={_id}
              image={images[0]}
              key={idx}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  let teams: ITeam[] | [] = [];
  try {
    const { data } = await client.get("/teams?status=approved");
    teams = data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      teams,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "project",
        "footer",
        "header",
      ])),
    },
  };
};
