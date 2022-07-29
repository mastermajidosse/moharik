export interface IOrganizer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  isAdmin: boolean;
  reports: number;
  blocked: boolean;
  verified: boolean;
  savedPosts?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v: number;
}
