import { useState, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { useTranslation } from "next-i18next";

import useScrollPosition from "../../hooks/useScrollPosition";
import { SquaredSolidButton } from "../materials/Buttons";
import { BurgerMenuIcon } from "../materials/icons";
import MobileMenu from "../menu/MobileMenu";
import { navs } from "../../data/navs";
import { ICurrentUser } from "../../interfaces/currentUser";
import ProfileMenu from "../menu/ProfileMenu";
import {
  FacebookIcon,
  InstagramIcon,
  GroupIcon,
  YoutubeIcon,
  GlobeIcon,
} from "../materials/icons";

export default function Header() {
  const { t } = useTranslation("header");
  const { t: tt } = useTranslation("common");
  const { route, query } = useRouter();
  const scrollPosition = useScrollPosition();
  const [isOpen, setIsOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<null | ICurrentUser>(null);

  useLayoutEffect(() => {
    const cookie = getCookie("currentUser");
    if (!cookie) return;
    const cr = JSON.parse(cookie?.toString() as string) as ICurrentUser;
    setCurrentUser(cr);
  }, []);

  return (
    <header 
    // className={clsx("fixed top-0 z-50 w-full py-4", {
    //   "bg-light": scrollPosition < 80,
    //   "bg-white shadow-header shadow-dark/10": scrollPosition > 80,
    //   "bg-white shadow-header-light shadow-dark/30": route !== "/",
    //   "md:absolute": query?.projectId,
    // })}
    >

      {/* <nav className="container bg-primary-900 h-4 md:h-8 flex items-center justify-between"> */}
      
      <nav  className="w-full bg-primary-900 h-4 md:h-8 flex items-center justify-between p-0">
      <div className="container flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-0 py-4">
       
        {/* social icons */}
        <ul className="flex items-center gap-5">
         
          <li>
            <Link href="https://web.facebook.com/Moharik.ma">
              <a target="_blank">
                <FacebookIcon className="fill-white" width="17" height="17" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/moharik.ma">
              <a target="_blank">
                <InstagramIcon className="fill-white" width="17" height="17"  />
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://web.facebook.com/groups/2224826977690975">
              <a target="_blank">
                <GroupIcon  className="fill-white" width="17" height="17" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/channel/UCyi8AOA2qA2RTK5JUfpKkmA">
              <a target="_blank">
                <YoutubeIcon className="fill-white" width="17" height="17" />
              </a>
            </Link>
          </li>
        </ul>
         {/* rights & extra-links */}
         <div className="flex flex-col-reverse md:flex-row font-normal text-xs gap-5">
          <p className="text-white font-bold">©2022 Moharik</p>
          
        </div>
      </div>
              
      </nav>

      <nav className="container bg-white h-8 md:h-16 flex items-center justify-between">
        <Link href="/">
          <figure className="cursor-pointer">
            <h1 className="text-2xl font-bold text-primary"> محرك </h1>
          </figure>
        </Link>
        <div className="h-full hidden md:flex font-normal text-base items-center gap-4 text-dark">
          {navs.map(({ link, title }, idx) => (
            <Link href={link} key={idx}>
        
              <a className={route === link ?
              "cursor-pointer font-bold text-primary duration-200 rounded-sm px-2 py-1":
                 "cursor-pointer hover:text-primary duration-200 rounded-sm px-2 py-1" } >
                {t(title)} 
              </a> 
             
            </Link>
          ))}
        </div>
        <div className="hidden md:flex">
          {currentUser ? (
            <ProfileMenu />
          ) : (
            <Link href="/login" passHref>
              <SquaredSolidButton className="hidden md:block mt-0 py-1 px-6 rounded-[0.25rem] bg-primary-500 text-white shadow-md shadow-lightDark/20 hover:bg-primary-800 duration-300">
                <a className="text-center font-medium tracking-wide leading-relaxed">
                  {tt("get_started")}
                </a>
              </SquaredSolidButton>
            </Link>
          )}
        </div>
        <a className="block md:hidden">
          <BurgerMenuIcon
            onClick={() => setIsOpen(true)}
            className="relative text-dark cursor-pointer"
            width="32"
            height="32"
          />
        </a>
        {/* <MobileMenu isOpen={isOpen} handleClose={() => setIsOpen(false)} /> */}
      </nav>
    </header>
  );
}
