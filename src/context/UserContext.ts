import { IUser } from './../types';
import { createContext } from 'react';

export const UserContext = createContext<{
    user: IUser;
    setUser?: React.Dispatch<React.SetStateAction<IUser>>;
}>({
    user: {
        username: '',
        email: '',
        isLogged: false,
    },
});
