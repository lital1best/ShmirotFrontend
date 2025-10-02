import axiosClient from "./axiosClient";

const USERS_URL = `/Users`

export const getUserInfo = () => axiosClient.get(`${USERS_URL}/me`, {dismissError: true})

export const createUser = (user) => axiosClient.post(USERS_URL, {role: user.role, ...user}, {
    rollbackUserOnFail: true,
}) // role has to be first
