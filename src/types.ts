export interface IBlog {
    title: string;
    text: string;
    author: {
        username: string;
    };
    timestamp: string;
    _id: string;
}
