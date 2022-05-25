import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import useScrollPosition from "../../hooks/useScrollPosition";
import { SquaredSolidButton } from "../materials/Buttons";
import { BurgerMenuIcon, CloseIcon } from "../materials/Icons";
import MobileMenu from "../menu/MobileMenu";

export default function Header() {
  const { route } = useRouter();
  const scrollPosition = useScrollPosition();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={clsx("fixed top-0 z-50 w-full py-4", {
        "bg-light": scrollPosition < 80,
        "bg-white shadow-header shadow-dark/10": scrollPosition > 80,
        "bg-white shadow-header-light shadow-dark/30": route !== "/",
      })}
    >
      <nav className="container h-8 md:h-14 flex items-center justify-between">
        <Link href="/">
          <figure className="cursor-pointer">
            <h1 className="text-xl font-bold text-primary">LOGO-ICI</h1>
          </figure>
        </Link>
        <div className="h-full hidden md:flex font-normal text-base items-center gap-4 text-dark">
          <Link href="/">
            <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
              Home
            </a>
          </Link>
          <Link href="/projects">
            <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
              Projects
            </a>
          </Link>
          <Link href="/how-it-works">
            <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
              How it works
            </a>
          </Link>
          <Link href="/help-center">
            <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
              Help center
            </a>
          </Link>
          <Link href="/about">
            <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
              About
            </a>
          </Link>
        </div>
        <SquaredSolidButton className="hidden md:block mt-0 py-1 px-6 rounded-[0.25rem] bg-primary-500 text-white shadow-md shadow-lightDark/20 hover:bg-primary-600 duration-300">
          <span className="text-center font-medium tracking-wide leading-relaxed">
            Get started
          </span>
        </SquaredSolidButton>
        <a className="">
          <BurgerMenuIcon
            onClick={() => setIsOpen(true)}
            className="relative text-dark block md:hidden cursor-pointer"
            width="32"
            height="32"
          />
        </a>
        <MobileMenu isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      </nav>
    </header>
  );
}
