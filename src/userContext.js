import React, {useContext, useEffect, useState} from 'react';
export const UserContext = React.createContext(null);

export function usePersistedUser() {
    const [user, setUser] = useState(null);
    const isJobMaster = user?.hasOwnProperty('jobs')

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return { user, login, logout, isJobMaster};
};

export const UserProvider = ({ children }) => {
    const { user, login, logout } = usePersistedUser();

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

