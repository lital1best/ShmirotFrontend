import axios from "axios";

export const CONSTRAINTS_BASE_URL = 'http://localhost:5038/api/SoldierConstrains/';
export const GET_CONSTRAINTS_BY_JOB_ID_URL = (jobId) => `${CONSTRAINTS_BASE_URL}job/${jobId}`;
export const GET_CONSTRAINTS_BY_SOLDIER_URL = (personalNumber) => `${CONSTRAINTS_BASE_URL}soldier/${personalNumber}`;
export const DOES_SOLDIER_HAS_CONSTRAINT_FOR_JOB_URL = (personalNumber, jobId) => `${CONSTRAINTS_BASE_URL}soldier/${personalNumber}/job/${jobId}`;
export const CreateSoldierConstrain = (soldierConstrain) => axios.post(CONSTRAINTS_BASE_URL, soldierConstrain);

export const EditSoldierConstrain = (reason, constrainId) => axios.put(CONSTRAINTS_BASE_URL + constrainId, reason, {
    headers: {
        'Content-Type': 'application/json'
    }
})

export const DeleteSoldierConstrain = (constrainId) => axios.delete(CONSTRAINTS_BASE_URL + constrainId);