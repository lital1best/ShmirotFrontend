import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
export const UserContext = React.createContext(null);

export function usePersistedUser() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const isJobMaster = user?.hasOwnProperty('jobs')

    useEffect(() => {
        console.log("here")
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [!!user]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate('/login');
    };

    return { user, login, logout, isJobMaster};
};

export const UserProvider = ({ children }) => {
    const { user, login, logout, isJobMaster } = usePersistedUser();

    return (
        <UserContext.Provider value={{ user, login, logout, isJobMaster}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

