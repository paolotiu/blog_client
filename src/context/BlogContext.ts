import { IBlog } from './../types';
import { createContext } from 'react';

export const BlogContext = createContext<{
    setBlogs?: React.Dispatch<React.SetStateAction<IBlog[] | null | undefined>>;
    blogs?: IBlog[] | null;
}>({});
