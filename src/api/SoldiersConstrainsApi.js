import axios from "axios";

export const CONSTRAINS_BASE_URL = 'http://localhost:5038/api/SoldierConstrains/';

export const CreateSoldierConstrain = (soldierConstrain) => axios.post(CONSTRAINS_BASE_URL, soldierConstrain);

export const EditSoldierConstrain = (reason, constrainId) => axios.put(CONSTRAINS_BASE_URL + constrainId, reason, {
    headers: {
        'Content-Type': 'application/json'
    }
})

export const DeleteSoldierConstrain = (constrainId) => axios.delete(CONSTRAINS_BASE_URL + constrainId);