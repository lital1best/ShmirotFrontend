// src/context/useAuthUser.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from "./firebase";
import axiosClient from "./api/axiosClient";

export function useAuthUser() {
    const [user, setUser] = useState(null);       // user data from backend
    const [token, setToken] = useState(null);     // Firebase ID token
    const [loading, setLoading] = useState(true); // to know when auth is initializing
    const navigate = useNavigate();

    const isJobMaster = !!user?.jobs;

    // Listen to Firebase auth state (on login, logout, refresh)
    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged(async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const idToken = await firebaseUser.getIdToken();
                    setToken(idToken);

                    // Fetch user data from backend
                    const res = await axiosClient.get('/users/me', {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    });

                    setUser(res.data);
                } catch (err) {
                    console.error('Error loading user from backend:', err);
                    await logout(); // force logout if something fails
                }
            } else {
                // Firebase user is null = logged out
                setUser(null);
                setToken(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (userData) => {
        // Optional: manually set user from backend if needed
        setUser(userData);
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        await auth.signOut();  // logs out Firebase session
        navigate('/login');    // redirect to login
    };

    return {
        user,
        token,
        loading,
        isJobMaster,
        login,
        logout,
    };
}
