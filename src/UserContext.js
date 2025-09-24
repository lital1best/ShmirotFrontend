import React, { createContext, useContext } from 'react';
import { useAuthUser } from './useAuthUser';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const auth = useAuthUser();

    return (
        <UserContext.Provider value={auth}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);