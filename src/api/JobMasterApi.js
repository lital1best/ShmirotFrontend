import axiosClient from '../api/axiosClient';

export const JOB_MASTER_BASE_URL = '/JobMasters';
export const JOB_MASTER_JOBS_FOR_MONTH_URL = (personalNumber, month, year) => `${JOB_MASTER_BASE_URL}/${personalNumber}/jobs?month=${month}&year=${year}`
export const GET_SOLDIERS_ORDERED_BY_SCORE_URL = (personalNumber) => `${JOB_MASTER_BASE_URL}/${personalNumber}/score-list`


export const createJobMasterApi = (createJobMasterContract) => axiosClient.post(JOB_MASTER_BASE_URL, createJobMasterContract, {meta: {rollbackUserOnFail: true}});

export const editJobMasterApi = (personalNumber, jobMasterContract) => axiosClient.put(`${JOB_MASTER_BASE_URL}/${personalNumber}`, jobMasterContract)

export const suggestJobsForMonthApi = (personalNumber, month, year) => axiosClient.get(`${JOB_MASTER_BASE_URL}/${personalNumber}/suggest-jobs/?month=${month}&year=${year}`)