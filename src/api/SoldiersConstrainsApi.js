import axiosClient from '../api/axiosClient';

const CONSTRAINTS_BASE_URL = '/SoldierConstraints/';
export const GET_CONSTRAINTS_BY_JOB_ID_URL = (jobId) => `${CONSTRAINTS_BASE_URL}job/${jobId}`;
export const DOES_SOLDIER_HAS_CONSTRAINT_FOR_JOB_URL = (personalNumber, jobId) => `${CONSTRAINTS_BASE_URL}soldier/${personalNumber}/job/${jobId}`;
export const createSoldierConstraint = (soldierConstraint) => axiosClient.post(CONSTRAINTS_BASE_URL, soldierConstraint);

export const editSoldierConstraint = (reason, constraintId) => axiosClient.put(CONSTRAINTS_BASE_URL + constraintId, reason, {
    headers: {
        'Content-Type': 'application/json'
    }
}) // headers here are required

export const deleteSoldierConstraint = (constraintId) => axiosClient.delete(CONSTRAINTS_BASE_URL + constraintId);