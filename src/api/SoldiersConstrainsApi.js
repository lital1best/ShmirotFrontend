import axiosClient from '../api/axiosClient';

export const CONSTRAINTS_BASE_URL = '/SoldierConstrains/';
export const GET_CONSTRAINTS_BY_JOB_ID_URL = (jobId) => `${CONSTRAINTS_BASE_URL}job/${jobId}`;
export const DOES_SOLDIER_HAS_CONSTRAINT_FOR_JOB_URL = (personalNumber, jobId) => `${CONSTRAINTS_BASE_URL}soldier/${personalNumber}/job/${jobId}`;
export const CreateSoldierConstrain = (soldierConstrain) => axiosClient.post(CONSTRAINTS_BASE_URL, soldierConstrain);

export const EditSoldierConstrain = (reason, constrainId) => axiosClient.put(CONSTRAINTS_BASE_URL + constrainId, reason, {
    headers: {
        'Content-Type': 'application/json'
    }
})

export const DeleteSoldierConstrain = (constrainId) => axiosClient.delete(CONSTRAINTS_BASE_URL + constrainId);