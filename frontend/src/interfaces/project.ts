export interface IProject {
  _id: string;
  user: string;
  title: string;
  desc: string;
  category: string;
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
}
