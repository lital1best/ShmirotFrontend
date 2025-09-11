import axios from "axios";
export const jobMastersBaseUrl = 'http://localhost:5038/api/JobMasters';
export const jobMasterJobsForMonthUrl = (personalNumber, month, year) => `${jobMastersBaseUrl}/${personalNumber}/jobs?month=${month}&year=${year}`



export const CreateJobMasterApi = (createJobMasterContract) => axios.post(jobMastersBaseUrl, createJobMasterContract, {headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
    }});

export const GetJobMastersApi = () => axios.get(jobMastersBaseUrl);
export const GetJobMasterByPersonalNumber = (personalNumber) => axios.get(`${jobMastersBaseUrl}/${personalNumber}`);