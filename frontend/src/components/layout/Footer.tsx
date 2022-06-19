import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FacebookIcon,
  InstagramIcon,
  GroupIcon,
  YoutubeIcon,
  GlobeIcon,
} from "../materials/icons";

export default function Footer() {
  const { locale } = useRouter();
  const { t } = useTranslation("footer");

  function switchLang() {
    if (locale === "ar") window.location.assign(`/`);
    if (locale === "en") window.location.assign(`/ar`);
  }

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
                  {t("terms")}
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="">
                <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                  {t("privacy")}
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="">
                <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                  {t("legal")}
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="">
                <a className="cursor-pointer hover:bg-light duration-200 rounded-sm px-2 py-1">
                  {t("accessibility_statement")}
                </a>
              </Link>
            </li>
          </ul>
        </div>
        {/* social icons */}
        <ul className="flex items-center gap-5">
          <li>
            <a
              onClick={switchLang}
              className="group flex items-center gap-1 cursor-pointer"
            >
              <span className="text-sm text-lightDark group-hover:text-dark">
                {locale == "en" ? "العربية" : "English"}
              </span>{" "}
              | <GlobeIcon width="20" height="20" />
            </a>
          </li>
          <li>
            <Link href="https://web.facebook.com/Moharik.ma">
              <a target="_blank">
                <FacebookIcon width="20" height="20" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/moharik.ma">
              <a target="_blank">
                <InstagramIcon width="20" height="20" className="" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://web.facebook.com/groups/2224826977690975">
              <a target="_blank">
                <GroupIcon width="20" height="20" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/channel/UCyi8AOA2qA2RTK5JUfpKkmA">
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
