import { IComment } from "./comment";
export interface ITeam {
  _id: string;
  user: any;
  title: string;
  description: string;
  link: string;
  status: string;
  images: string[];
  tags: string[];
  needs: NeedType[] | [];
  members?: any[];
  createdAt: Date;
  updatedAt: Date;
  comments?: IComment[] | [];
}

type NeedType = {
  title: string;
  description: string;
  images: string[];
  _id: string;
};
