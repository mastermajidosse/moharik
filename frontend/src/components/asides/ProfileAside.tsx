import { removeCookies } from "cookies-next";
import React from "react";
import {
  EmailIcon,
  GearIcon,
  GlobeIcon,
  LogoutIcon,
  PersonIcon,
  PersonPlusIcon,
  UserIcon,
} from "../materials/icons";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const ProfileAside = ({
  name,
  email,
  country,
}: {
  name: string;
  email: string;
  country: string;
}) => {
  const { t } = useTranslation("header");
  const { locale } = useRouter();
  function logOut() {
    removeCookies("currentUser");
    window.location.assign("/" + locale);
  }
  return (
    <aside className="hidden md:flex flex-col md:col-span-2 h-full bg-light rounded-md border-2 border-light p-2">
      <div className="w-full flex flex-1 flex-col gap-2 items-center ">
        <figure className="relative __pattern w-28 h-28 mx-auto rounded-full ring-2 ring-primary-100 shadow-md"></figure>
        <p className="text-lg font-medium text-dark">{name || "---"}</p>
        <div className="w-full">
          <p className="font-medium text-sm flex items-center gap-1.5 text-lightDark mb-2">
            <EmailIcon /> {email || "---"}
          </p>
          <p className="font-medium text-sm flex items-center gap-1.5 text-lightDark">
            <GlobeIcon /> {country || "---"}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 pt-4 border-t border-slate-200">
        <Link href="/profile" passHref>
          <a className="hover:text-link font-medium text-sm flex items-center gap-2 text-dark/75">
            <PersonIcon width="22" height="22" className="mb-0.5  " />{" "}
            <p>My Profile</p>
          </a>
        </Link>
        <Link href="/profile/settings" passHref>
          <a className="hover:text-link font-medium text-sm flex items-center gap-2 text-dark/75">
            <GearIcon width="18" height="18" className="mb-0.5  " />{" "}
            <p>Settings</p>
          </a>
        </Link>
        <button
          onClick={logOut}
          className="w-full flex items-center gap-2 cursor-pointer hover:text-link text-dark/75"
        >
          <LogoutIcon width="18" height="18" className="mb-1.5  " />
          <p className="font-medium text-sm flex items-center gap-2  mb-2">
            {t("sign_out")}
          </p>
        </button>
      </div>
    </aside>
  );
};

export default ProfileAside;
