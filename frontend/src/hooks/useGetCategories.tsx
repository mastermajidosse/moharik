import { useEffect, useState } from "react";
import { client } from "../utils/api";

export interface CategoryObject {
  name: { en: string; ar: string };
  _id: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  color: string;
}

export default function useGetCategories() {
  const [categories, setCategories] = useState<CategoryObject[] | []>([]);

  async function getCategories() {
    try {
      const { data } = await client.get<CategoryObject[] | []>("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);
  return { categories };
}
