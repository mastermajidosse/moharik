import clsx from "clsx";
import Link from "next/link";
import { removeCookies } from "cookies-next";

import { SquaredSolidButton } from "../materials/Buttons";
import { CloseIcon, LogoutIcon } from "../materials/icons";
import { navs } from "../../data/navs";
import { getCurrentUser } from "../../utils/getCurrentUser";

export default function MobileMenu({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  function logOut() {
    removeCookies("currentUser");
    handleClose();
    window.location.assign("/");
  }
  return (
    <aside
      className={clsx("block md:hidden w-11/12 h-screen bg-light ", {
        "block absolute opacity-100 top-0 right-0 translate-x-0 duration-300 shadow-xl shadow-primary-900/75":
          isOpen,
        "absolute top-0 right-0 translate-x-full duration-300": !isOpen,
      })}
    >
      <div className="w-full h-full py-4 px-8 flex flex-col">
        {/* logo */}
        <div className="w-full flex justify-between items-center">
          <Link href="/">
            <figure className="cursor-pointer">
              <h1 className="text-xl font-bold text-primary">Moharik</h1>
            </figure>
          </Link>
          <CloseIcon
            onClick={handleClose}
            className="text-dark block md:hidden cursor-pointer"
            width="28"
            height="28"
          />
        </div>
        {/* navs */}
        <nav className="h-full flex-1 flex flex-col font-medium text-base items-center justify-center gap-6 text-dark">
          {getCurrentUser() && (
            <Link href="/profile">
              <a
                onClick={handleClose}
                className="cursor-pointer text-primary-800 hover:bg-light duration-200 rounded-sm px-2 py-1"
              >
                {"Profile"}
              </a>
            </Link>
          )}
          {navs.map(({ link, title }, idx) => (
            <Link href={link} key={idx}>
              <a
                onClick={handleClose}
                className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1"
              >
                {title.fr}
              </a>
            </Link>
          ))}
        </nav>
        <div className="flex justify-between items-center">
          <SquaredSolidButton className="my-5 py-1 px-6 rounded-[0.25rem] bg-primary-500 text-white shadow-md shadow-lightDark/20 hover:bg-primary-600 duration-300">
            <span className="text-center font-medium tracking-wide leading-relaxed">
              Get started
            </span>
          </SquaredSolidButton>
          {getCurrentUser() ? (
            <div
              onClick={logOut}
              className="flex items-center gap-2 hover:text-link duration-300 cursor-pointer"
            >
              <p className="">Sign out</p>
              <LogoutIcon />
            </div>
          ) : (
            <Link href="/login">
              <a className="flex items-center gap-2 hover:text-link duration-300 cursor-pointer">
                <p className="">Sign in</p>
                <div className="rotate-180">
                  <LogoutIcon />
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
      <div className=""></div>
    </aside>
  );
}
