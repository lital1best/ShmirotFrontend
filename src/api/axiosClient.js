import axios from 'axios';
import { auth } from '../firebase';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5038/api',
});

axiosClient.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosClient;