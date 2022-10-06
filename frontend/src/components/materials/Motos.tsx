import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function Motos() {
  const { t } = useTranslation("home-page");
  const { locale } = useRouter();
  return (
    <div
      className={clsx("overflow-hidden", {
        "h-[90px] ": locale === "en",
        "h-[100px] ": locale === "ar",
      })}
    >
      <div
        className={clsx("h-full", {
          "hero-text__list": locale === "en",
          "hero-text__list_ar": locale === "ar",
        })}
      >
        <h2 className="text-4xl font-black text-dark  capitalize h-full ">
          {t("moto_1")}
        </h2>
        <h2 className="text-4xl font-black text-dark capitalize h-full">
          {t("moto_2")}
        </h2>
        <h2 className="text-4xl font-black text-dark  capitalize h-full pt-4">
          {t("moto_3")}
        </h2>
        <h2 className="text-4xl font-black text-dark capitalize h-full ">
          {t("moto_4")}
        </h2>
      </div>
    </div>
  );
}
