import axios from 'axios';

const BASE_SOLDIERS_URL = 'http://localhost:5038/api/Soldiers';
export const SOLDIERS_JOBS_FOR_MONTH_URL = (personalNumber, month, year) => `${BASE_SOLDIERS_URL}/${personalNumber}/jobs?month=${month}&year=${year}`

export const CreateSoldierApi = (createSoldierContract) => axios.post(BASE_SOLDIERS_URL, createSoldierContract);
export const GetSoldierByPersonalNumber = (personalNumber) => axios.get(`${BASE_SOLDIERS_URL}/${personalNumber}`);