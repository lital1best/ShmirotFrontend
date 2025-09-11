import axios from 'axios';

const baseUrl = 'http://localhost:5038/api/Soldiers';
export const soldiersJobsForMonthUrl = (personalNumber, month, year) => `${baseUrl}/${personalNumber}/jobs?month=${month}&year=${year}`

export const CreateSoldierApi = (createSoldierContract) => axios.post(baseUrl, createSoldierContract);
export const GetSoldierByPersonalNumber = (personalNumber) => axios.get(`${baseUrl}/${personalNumber}`);