import { NextSeoProps } from "next-seo";
export const defaultSEO: NextSeoProps = {
  description:
    "Moharik is a way to raise money from an investor to provide the capital needed to get a company or project off the ground. Individuals, charities, or companies can create a campaign for specific causes and anyone can provide the money for the project they choose",
  openGraph: {
    //TODO: this must be generated at page level not top level
    url: "https://www.moharik.ma",
    title: "Moharik",
    description:
      "Moharik is a way to raise money from an investor to provide the capital needed to get a company or project off the ground. Individuals, charities, or companies can create a campaign for specific causes and anyone can provide the money for the project they choose",
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
    site_name: "Moharik",
  },
};
