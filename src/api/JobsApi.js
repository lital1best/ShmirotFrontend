import axios from "axios";

export const JOBS_BASE_URL = 'http://localhost:5038/api/Jobs';


export const createJob = (job) => axios.post(JOBS_BASE_URL, job, {headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
    }})

export const editJob = (job, jobId) => axios.put(`${JOBS_BASE_URL}/${jobId}`, job)

export const deleteJob = (jobId) => axios.delete(`${JOBS_BASE_URL}/${jobId}`)

export const SubmitJobsAssignment = (jobs) => axios.post(`${JOBS_BASE_URL}/assign-jobs`, jobs)