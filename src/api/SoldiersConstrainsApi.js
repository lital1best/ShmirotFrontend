import axios from "axios";

const CONSTRAINS_BASE_URL = 'http://localhost:5038/api/SoldierConstrains/';

export const CreateSoldierConstrain = (soldierConstrain) => axios.post(CONSTRAINS_BASE_URL, soldierConstrain);