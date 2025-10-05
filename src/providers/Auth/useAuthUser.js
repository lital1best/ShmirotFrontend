import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from "./firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useSnackbar} from "../Snackbar/SnackbarProvider";
import {getUserInfo} from "../../api/usersApi";

export function useAuthUser() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [createUserFail, setCreateUserFail] = useState(false);

    const navigate = useNavigate();
    const {showMessage} = useSnackbar();

    const isJobMaster = !!user?.jobs;

    const mutateUserWithToken =  (idToken = token) => {
        if (!!idToken && !createUserFail) {
            getUserInfo().then((res) => setUser(res?.data))
        }
    }

    useEffect(() => {
        if (createUserFail) {
            setCreateUserFail(false);
            return
        }

        const unsubscribe = auth.onIdTokenChanged(async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const idToken = await firebaseUser.getIdToken();
                    setToken(idToken);
                    mutateUserWithToken(idToken);
                } catch (err) {
                    showMessage(err);
                    await logout();
                }
            } else {
                setUser(null);
                setToken(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            const idToken = await firebaseUser.getIdToken();
            setToken(idToken)
            navigate('/');
            setCreateUserFail(false);
        } catch (err) {
            showMessage(err.message);
        }
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        await auth.signOut();
        navigate('/login');
        setCreateUserFail(false);
    };

    return {
        user,
        token,
        loading,
        isJobMaster,
        login,
        logout,
        mutateUserWithToken,
        setCreateUserFail,
    };
}
