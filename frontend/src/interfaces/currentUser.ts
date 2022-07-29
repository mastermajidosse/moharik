export interface ICurrentUser {
  _id: string;
  name: string;
  phone?: string;
  email: string;
  isAdmin: boolean;
  country: string;
  token: string;
  savedPosts?: any[];
}
