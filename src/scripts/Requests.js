import axios from 'axios';

const requestService = axios.create(
    {
        baseURL: "/api",
        timeout: 1000,
    }
)

export async function postData(url, data) {
    try {
        const response = await requestService.post(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getData(url, data) {
    try {
        const response = await requestService.get(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

requestService.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token)
            config.headers.Authorization = token
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
);