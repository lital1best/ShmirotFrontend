import axios from 'axios';
import {auth} from '../firebase';
import {SnackbarUtils} from "../providers/SnackbarUtils";

export const BASE_URL = 'http://localhost:5038/api'
const axiosClient = axios.create({
    baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (response) => response,
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.config?.dismissError) {
            return;
        }
        SnackbarUtils.show(error, 'error');

        if (auth.currentUser && error.config?.rollbackUserOnFail) {
            auth.currentUser.delete().then().catch();
            return Promise.reject(error);
        }

        console.log("Axios interceptor got an error ", error);
    }
);
export default axiosClient;