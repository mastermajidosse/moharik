import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LogoutIcon, UserIcon } from "../materials/icons";
import { getCookie, removeCookies } from "cookies-next";
import { ICurrentUser } from "../../interfaces/currentUser";
import clsx from "clsx";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function ProfileMenu() {
  const { t } = useTranslation("header");
  const [name, setName] = useState<string | null>(null);
  const [clicked, setClicked] = useState(false);
  const menuRef = useRef(null);
  const { locale } = useRouter();

  useOnClickOutside(menuRef, () => setClicked(false));

  useEffect(() => {
    const currentUser = getCookie("currentUser");
    if (currentUser) {
      const parsed = JSON.parse(currentUser as string) as ICurrentUser;
      setName(parsed?.name || null);
    }
  }, []);

  const toggleMenu = () => setClicked(!clicked);

  function logOut() {
    removeCookies("currentUser");
    window.location.assign("/" + locale);
  }

  return (
    <div className="relative">
      {name ? (
        <figure
          onClick={toggleMenu}
          className="w-10 h-10 flex justify-center items-center bg-primary-50 border-2 border-primary-200 rounded-full cursor-pointer"
        >
          <p className="text-lg font-medium text-primary-600">
            {name
              .split(" ")
              .map((str) => str.substring(0, 1))
              .join("")
              .toUpperCase()}
          </p>
        </figure>
      ) : (
        <UserIcon
          onClick={toggleMenu}
          width="32"
          height="32"
          className="text-primary-700 cursor-pointer"
        />
      )}
      <ul
        ref={menuRef}
        className={clsx("absolute top-12 -left-10 bg-white", {
          "h-auto duration-200 py-4 shadow-md border border-slate-200": clicked,
          "h-0 overflow-hidden duration-200": !clicked,
          "w-44": locale === "ar",
          "w-32": locale === "en",
        })}
      >
        <li
          onClick={() => setClicked(false)}
          className="group w-full px-4 py-1 hover:bg-slate-50 cursor-pointer"
        >
          <Link href="/profile">
            <a className="flex gap-1 items-center">
              <UserIcon width="16" height="16" />
              {t("profile")}
            </a>
          </Link>
        </li>
        <li
          onClick={() => {
            logOut();
            setClicked(false);
          }}
          className="group px-4 py-1 hover:bg-slate-50 cursor-pointer"
        >
          <a className="flex gap-1 items-center">
            <LogoutIcon width="16" height="16" />
            {t("sign_out")}
          </a>
        </li>
      </ul>
    </div>
  );
}
