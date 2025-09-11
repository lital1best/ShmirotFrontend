import axios from "axios";

export const jobsBaseUrl = 'http://localhost:5038/api/Jobs';


export const createJob = (job) => axios.post(jobsBaseUrl, job, {headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
    }})

export const editJob = (job, jobId) => axios.put(`${jobsBaseUrl}/${jobId}`, job)

export const deleteJob = (jobId) => axios.delete(`${jobsBaseUrl}/${jobId}`)