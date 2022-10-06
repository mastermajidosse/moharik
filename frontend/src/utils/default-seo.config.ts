import { NextSeoProps } from "next-seo";
export const defaultSEO: NextSeoProps = {
  description:
  "Moharik is a way to help achive your goal by raising money from an investor to provide the capital needed to get a company or project off the ground or by teaming up with good like minded people.",
  openGraph: {
    //TODO: this must be generated at page level not top level
    url: "https://www.moharik.ma",
    title: "Moharik : محرك",
    description:
      "Moharik is a way to help achive your goal by raising money from an investor to provide the capital needed to get a company or project off the ground or by teaming up with good like minded people.",
    images: [
      {
        url: "https://www.moharik.ma/logo.jpg",
        width: 800,
        height: 600,
        alt: "moharik",
        type: "image/jpeg",
      },
      {
        url: "https://www.moharik.ma/logo.jpg",
        width: 900,
        height: 800,
        alt: "moharik",
        type: "image/jpeg",
      },
      { url: "https://www.moharik.ma/logo.jpg" },
      { url: "https://www.moharik.ma/logo.jpg" },
    ],
    site_name: "Moharik : محرك",
  },
};
