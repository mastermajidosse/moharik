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
      className={clsx("fixed top-0 z-50 w-full py-4", {
        "bg-light": scrollPosition < 80,
        "bg-white shadow-header shadow-dark/10": scrollPosition > 80,
        "bg-white shadow-header-light shadow-dark/30": route !== "/",
        "md:absolute": query?.projectId,
      })}
    >
      <nav className="container h-8 md:h-14 flex items-center justify-between">
        <Link href="/">
          <figure className="cursor-pointer">
            <h1 className="text-xl font-bold text-primary">Moharik</h1>
          </figure>
        </Link>
        <div className="h-full hidden md:flex font-normal text-base items-center gap-4 text-dark">
          {navs.map(({ link, title }, idx) => (
            <Link href={link} key={idx}>
              <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
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
              <SquaredSolidButton className="hidden md:block mt-0 py-1 px-6 rounded-[0.25rem] bg-primary-500 text-white shadow-md shadow-lightDark/20 hover:bg-primary-600 duration-300">
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
        <MobileMenu isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      </nav>
    </header>
  );
}
