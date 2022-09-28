import axios from 'axios';
const BASE_URL = `http://${process.env.REACT_APP_SECRET_IP}:8080`;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

