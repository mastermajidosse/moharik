import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Motos() {
  const { t } = useTranslation("home-page");
  const [counter, setCounter] = useState(0);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (counter === 4) {
  //         setCounter(0);
  //       }
  //       setCounter(counter + 1);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, [counter]);
  return (
    <div className="h-[90px] overflow-hidden">
      <div className="hero-text__list h-full">
        <h2 className="text-4xl font-black text-dark capitalize h-full ">
          {t("moto_1")}
        </h2>
        <h2 className="text-4xl font-black text-dark capitalize h-full">
          {t("moto_2")}
        </h2>
        <h2 className="text-4xl font-black text-dark capitalize h-full pt-4">
          {t("moto_3")}
        </h2>
        <h2 className="text-4xl font-black text-dark capitalize h-full ">
          {t("moto_4")}
        </h2>
      </div>
    </div>
  );
}
