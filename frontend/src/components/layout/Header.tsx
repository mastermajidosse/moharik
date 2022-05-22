import clsx from "clsx";
import useScrollPosition from "../../hooks/useScrollPosition";
export default function Header() {
  const scrollPosition = useScrollPosition();

  return (
    <header
      className={clsx("fixed top-0 w-full py-4", {
        "bg-light": scrollPosition < 80,
        "bg-white shadow-header shadow-dark/10": scrollPosition > 80,
      })}
    >
      <nav className="container h-14 flex items-center justify-between">
        <figure className="">
          <h1 className="text-xl font-bold text-primary">LOGO-ICI</h1>
        </figure>
        <div className="h-full flex font-normal text-base items-center gap-4 text-dark">
          <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
            Home
          </a>
          <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
            Projects
          </a>
          <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
            How it works
          </a>
          <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
            Help center
          </a>
          <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
            About
          </a>
          <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
            Sign In
          </a>
        </div>
      </nav>
    </header>
  );
}
