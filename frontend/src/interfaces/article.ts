export interface IArticle {
    _id: string;
    creator: {
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
    title: string
    content: string
    image: string;
    __v?: number;
}
