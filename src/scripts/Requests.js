import axios from 'axios';
import { CurrentUser } from './session';

const baseURL = "http://8.134.104.253:8080";

const requestService = axios.create(
    {
        baseURL: baseURL,
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

export async function fileData(url, data) {
    var formData = new FormData();
    data.forEach((fileData, index) => {
        formData.append(`file${index}`, fileData);
    });

    const response = await requestService.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
}

export function getURL(url) {
    return baseURL + url;
}

requestService.interceptors.request.use(
    config => {
        const token = CurrentUser.token;
        if (token)
            config.headers.Authorization = token
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
);