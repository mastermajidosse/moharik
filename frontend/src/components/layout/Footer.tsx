import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
} from "../materials/Icons";

export default function Footer() {
  return (
    <footer className="w-fill py-4 bg-white border-t border-lightDark/30">
      <div className="container flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-0 py-4">
        {/* rights & extra-links */}
        <div className="flex flex-col-reverse md:flex-row font-normal text-base items-center gap-5 text-dark">
          <p className="font-medium text-lightDark">© 2022 Moharik</p>
          <ul className="flex items-center gap-4">
            <li className="">
              <Link href="">
                <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                  Terms
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="">
                <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                  Privacy
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="">
                <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                  Legal
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="">
                <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                  Accessibility Statement
                </a>
              </Link>
            </li>
          </ul>
        </div>
        {/* social icons */}
        <ul className="flex items-center gap-5">
          <li>
            <Link href="wwww.fb.com">
              <a target="_blank">
                <FacebookIcon width="20" height="20" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="wwww.fb.com">
              <a target="_blank">
                <InstagramIcon width="20" height="20" className="" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="wwww.fb.com">
              <a target="_blank">
                <TiktokIcon width="20" height="20" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="wwww.fb.com">
              <a target="_blank">
                <YoutubeIcon width="20" height="20" />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
