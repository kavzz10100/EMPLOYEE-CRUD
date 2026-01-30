import axios from "axios";

const API = axios.create({
 baseURL: import.meta.env.VITE_API_URL + "/api/employees"
});

export const getEmployees = () => API.get("/");
export const createEmployee = (data) => API.post("/", data);
export const updateEmployee = (empId, data) => API.put(`/${empId}`, data);
export const deleteEmployee = (empId) => API.delete(`/${empId}`);


