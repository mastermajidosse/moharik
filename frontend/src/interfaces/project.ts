import { ICategory } from "./category";
import { IComment } from "./comment";

export interface IProject {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    country: string;
    isAdmin: boolean;
    reports: number;
    blocked: boolean;
    verified: boolean;
    __v: number;
  };
  title:
    | string
    | {
        en: string;
        ar: string;
      };
  desc:
    | string
    | {
        en: string;
        ar: string;
      };
  status: string;
  link?: string;
  category?: ICategory;
  images: string[];
  price: number;
  collected: number;
  deadline: Date;
  likes: any[];
  updates: any[];
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
  reports: any[];
  comments?: IComment[] | [];
}
