export interface IBlog {
    title: string;
    text: string;
    author: {
        username: string;
    };
    comments: Array<{
        author: string;
        text: string;
        timestamp: string;
    }>;
    timestamp: string;
    _id: string;
}
