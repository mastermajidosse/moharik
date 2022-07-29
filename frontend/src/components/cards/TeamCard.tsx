import { useRouter } from "next/router";

interface TeamCardProps {
  title: string;
  id: string;
  tags: string[];
  image?: string;
  members?: any[];
  link: string;
  isMine?: boolean;
}

const TeamCard = ({
  image = "/assets/images/about.jpg",
  tags,
  id,
  link,
  title,
  members,
  isMine = false,
}: TeamCardProps) => {
  const { push } = useRouter();
  const toTeamPage = () => push(`/teams/${id}`);
  return (
    <div className="w-full bg-light rounded cursor-pointer hover:shadow-xl hover:shadow-lightDark/10 duration-150 overflow-hidden">
      {/* card cover */}
      <figure onClick={toTeamPage} className="w-full h-44">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="team card"
        />
      </figure>
      {/* card info */}
      <div className="p-2 flex flex-col gap-2">
        <h3 onClick={toTeamPage} className="font-semibold text-lg text-dark">
          {title}
        </h3>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <li
              className="font-medium text-sm text-dark bg-slate-200/75 px-2 py-1 rounded-md"
              key={idx}
            >
              #{tag}
            </li>
          ))}
        </ul>
        {/* members */}
        <div className="flex justify-between items-center my-2">
          <ul className="flex -space-x-1">
            <li className="shadow-sm w-6 h-6 text-sm font-mono flex justify-center items-center bg-red-100 rounded-full border border-red-300">
              AD
            </li>
            <li className="shadow-sm w-6 h-6 text-sm font-mono flex justify-center items-center bg-lime-100 rounded-full border border-lime-300">
              SM
            </li>
            <li className="shadow-sm w-6 h-6 text-sm font-mono flex justify-center items-center bg-purple-100 rounded-full border border-purple-300">
              BS
            </li>
            <li className="shadow-sm w-6 h-6 text-sm font-mono flex justify-center items-center bg-light rounded-full border border-lightDark text-lightDark">
              +2
            </li>
          </ul>
          {!isMine && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="w-auto px-4 py-1 text-bold flex justify-center items-center rounded-full border border-primary-700 bg-primary-700 text-white duration-150 "
            >
              <span className="text-sm font-medium">Join Now</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
