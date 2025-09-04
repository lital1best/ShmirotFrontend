import axios from "axios";
const baseUrl = 'http://localhost:5038/api/JobMasters';

export const CreateJobMasterApi = (createJobMasterContract) => axios.post(baseUrl, createJobMasterContract);