import clsx from "clsx";
import { SquaredSolidButton } from "../materials/Buttons";
import Link from "next/link";
import { CloseIcon } from "../materials/Icons";
import { navs } from "../../data/navs";
export default function MobileMenu({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
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

        <SquaredSolidButton className="my-5 py-1 px-6 rounded-[0.25rem] bg-primary-500 text-white shadow-md shadow-lightDark/20 hover:bg-primary-600 duration-300">
          <span className="text-center font-medium tracking-wide leading-relaxed">
            Get started
          </span>
        </SquaredSolidButton>
      </div>
      <div className=""></div>
    </aside>
  );
}
