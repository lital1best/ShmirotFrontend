import axios from "axios";

export const AUTH_BASE_URL = 'http://localhost:5038/api/auth';

export const verifyToken = (token) => axios.post(`${AUTH_BASE_URL}/verify-token`, {token});