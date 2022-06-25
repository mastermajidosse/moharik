import { client } from "../utils/api";
import { IProject } from "../interfaces/project";
import { GetServerSideProps } from "next";

function generateSiteMap(posts: IProject[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://moharik.ma</loc>
     </url>
     <url>
       <loc>https://moharik.ma/projects</loc>
     </url>
     ${posts
       .map(({ _id: id }) => {
         return `
       <url>
           <loc>${process.env.NEXT_PUBLIC_API_URL}/posts/${id}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  const { data } = await client.get<IProject[]>("/posts");

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
