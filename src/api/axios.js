import axios from 'axios';
const t = true;
const BASE_URL = t ? `http://${process.env.REACT_APP_SECRET_IP}` : `http://localhost:8080`;

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

