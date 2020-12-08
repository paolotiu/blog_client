export interface IBlog {
    title: string;
    text: string;
    author: {
        username: string;
    };
    comments: Array<IComment>;
    timestamp: string;
    _id: string;
}

export interface IComment {
    _id: string;
    author: string;
    text: string;
    timestamp: string;
}
