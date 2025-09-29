import axiosClient from '../api/axiosClient';

const JOBS_BASE_URL = '/Jobs';

export const createJob = (job) => axiosClient.post(JOBS_BASE_URL, job)

export const editJob = (job, jobId) => axiosClient.put(`${JOBS_BASE_URL}/${jobId}`, job)

export const deleteJob = (jobId) => axiosClient.delete(`${JOBS_BASE_URL}/${jobId}`)

export const SubmitJobsAssignment = (jobs) => axiosClient.post(`${JOBS_BASE_URL}/assign-jobs`, jobs)