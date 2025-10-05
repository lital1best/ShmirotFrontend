import axiosClient from '../api/axiosClient';

const BASE_SOLDIERS_URL = '/Soldiers';
export const SOLDIERS_JOBS_FOR_MONTH_URL = (personalNumber, month, year) => `${BASE_SOLDIERS_URL}/${personalNumber}/jobs?month=${month}&year=${year}`

export const editSoldierApi = (personalNumber, editSoldierContract) => axiosClient.put(`${BASE_SOLDIERS_URL}/${personalNumber}`, editSoldierContract);