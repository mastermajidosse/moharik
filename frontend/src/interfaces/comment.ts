export interface IComment {
  comment: string;
  author: {
    _id: string;
    name: string;
    country: string;
  };
  createdAt: Date;
  _id: string;
}
