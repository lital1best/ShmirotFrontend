import axios from "axios";
export const JOB_MASTER_BASE_URL = 'http://localhost:5038/api/JobMasters';
export const JOB_MASTER_JOBS_FOR_MONTH_URL = (personalNumber, month, year) => `${JOB_MASTER_BASE_URL}/${personalNumber}/jobs?month=${month}&year=${year}`
export const GET_SOLDIERS_ORDERED_BY_SCORE_URL = (personalNumber) => `${JOB_MASTER_BASE_URL}/${personalNumber}/score-list`


export const CreateJobMasterApi = (createJobMasterContract) => axios.post(JOB_MASTER_BASE_URL, createJobMasterContract, {headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
    }});

export const GetJobMastersApi = () => axios.get(JOB_MASTER_BASE_URL);
export const GetJobMasterByPersonalNumber = (personalNumber) => axios.get(`${JOB_MASTER_BASE_URL}/${personalNumber}`);

export const EditJobMasterApi = (personalNumber, jobMasterContract) => axios.put(`${JOB_MASTER_BASE_URL}/${personalNumber}`, jobMasterContract)

export const SuggestJobsForMonthApi = (personalNumber, month, year) => axios.get(`${JOB_MASTER_BASE_URL}/${personalNumber}/suggest-jobs/?month=${month}&year=${year}`)