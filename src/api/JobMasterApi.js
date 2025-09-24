import axiosClient from '../api/axiosClient';

export const JOB_MASTER_BASE_URL = '/JobMasters';
export const JOB_MASTER_JOBS_FOR_MONTH_URL = (personalNumber, month, year) => `${JOB_MASTER_BASE_URL}/${personalNumber}/jobs?month=${month}&year=${year}`
export const GET_SOLDIERS_ORDERED_BY_SCORE_URL = (personalNumber) => `${JOB_MASTER_BASE_URL}/${personalNumber}/score-list`


export const CreateJobMasterApi = (createJobMasterContract) => axiosClient.post(JOB_MASTER_BASE_URL, createJobMasterContract, {headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
    }});

export const GetJobMastersApi = () => axiosClient.get(JOB_MASTER_BASE_URL);
export const GetJobMasterByPersonalNumber = (personalNumber) => axiosClient.get(`${JOB_MASTER_BASE_URL}/${personalNumber}`);

export const EditJobMasterApi = (personalNumber, jobMasterContract) => axiosClient.put(`${JOB_MASTER_BASE_URL}/${personalNumber}`, jobMasterContract)

export const SuggestJobsForMonthApi = (personalNumber, month, year) => axiosClient.get(`${JOB_MASTER_BASE_URL}/${personalNumber}/suggest-jobs/?month=${month}&year=${year}`)