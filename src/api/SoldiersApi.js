import axios from 'axios';

const baseUrl = 'http://localhost:5038/api/Soldiers';

export const CreateSoldierApi = (createSoldierContract) => axios.post(baseUrl, createSoldierContract);