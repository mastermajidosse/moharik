import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import clsx from "clsx";
import { toast } from "react-toastify";

import { FilledHeartIcon } from "../materials/icons";
import { getCurrentUser } from "../../utils/getCurrentUser";
import { categoriesWithColors } from "../../data/categories";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTranslation } from "next-i18next";

interface ProjectCardProps {
  id: string;
  title: string;
  desc?: string;
  category: string;
  images: string[];
  price?: number;
  collected?: number;
  deadline?: Date;
  createdAt: Date;
  likes?: string[] | [];
}

export default function ProjectCard({
  id,
  category,
  createdAt,
  images,
  price,
  title,
  collected,
}: ProjectCardProps) {
  const { t } = useTranslation("project");
  const { push } = useRouter();
  const [storedValue, setValue] = useLocalStorage<ProjectCardProps[]>(
    "likes",
    []
  );
  const progress =
    collected && price ? (1 - (price - collected) / 100) * 100 : 0;
  const daysCount = dayjs(Date.now()).diff(dayjs(createdAt), "days");

  async function handleLike() {
    try {
      if (!storedValue.find((item) => item.id === id)) {
        setValue([
          { id, category, createdAt, images, price, title, collected },
          ...storedValue,
        ]);
        toast.success("Project is Liked", {
          icon: "❤️",
        });
      } else {
        setValue((val) => val.filter((item) => item.id !== id));
        toast.success("Project is Unliked", {
          icon: "💔",
        });
      }
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log(error);
    }
  }

  return (
    <div className="group flex flex-col shadow-md hover:shadow-lg duration-200">
      <figure className="relative h-52">
        <img
          onClick={() => push(`/projects/${id}`)}
          className="w-full h-full bg-cover cursor-pointer"
          src={images[0] || "/assets/images/placeholder.png"}
          alt=""
        />
        {/* progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-light/50">
          <div
            style={{
              width: `${progress}%`,
            }}
            className="h-full bg-primary-400"
          />
          {getCurrentUser() && (
            <div
              onClick={handleLike}
              className={clsx(
                "absolute right-2 -top-3 h-8 w-8 bg-light flex justify-center items-center rounded-full shadow-md  hover:text-red-400 duration-300 cursor-pointer",
                {
                  "text-red-200": !storedValue.find((item) => item.id === id),
                  "text-red-400": storedValue.find((item) => item.id === id),
                }
              )}
            >
              <FilledHeartIcon width="14" height="14" />
            </div>
          )}
        </div>
      </figure>
      <div className="w-full bg-white group-hover:bg-primary-50/10 duration-200 p-5 flex flex-col gap-3">
        <Link href={`/projects?category=${category?.toLocaleLowerCase()}`}>
          <p
            style={{
              backgroundColor: categoriesWithColors.find(
                (item) => item.name == category
              )?.color,
            }}
            className="w-fit px-4 py-1 text-xs tracking-wide leading-relaxed text-light capitalize font-medium cursor-pointer"
          >
            {category}
          </p>
        </Link>
        <Link href={`/projects/${id}`}>
          <a>
            <h3 className="text-dark h-[56px] text-lg md:text-xl font-black group-hover:underline line-clamp-2 cursor-pointer">
              {title}
            </h3>
          </a>
        </Link>
        {/* {desc && (
          <p className="text-lightDark font-medium leading-relaxed tracking-wide text-sm line-clamp-2">
            {desc}
          </p>
        )} */}
        {price && (
          <div className="flex flex-col gap-1 border-t pt-2">
            <p className="text-lightDark text-sm font-medium">
              {daysCount > 0
                ? t("created_days_ago", { date: daysCount })
                : t("created_today")}
            </p>
            <p className="text-link font-bold">
              {collected}Dhs {t("raised_of")}{" "}
              <span className="text-lightDark">{price}Dhs</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
