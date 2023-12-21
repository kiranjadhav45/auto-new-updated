// api.js
import axios from 'axios';

const BASE_URL = 'https://urchin-app-kcgxp.ondigitalocean.app';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const callApi = async (
    endpoint,
    method = 'GET',
    data = null,
    customHeaders = {},
    authToken = null
) => {
    try {
        const config = {
            url: endpoint,
            method,
            headers: {
                ...api.defaults.headers,
                ...customHeaders,
            },
        };

        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        if (method === 'GET') {
            config.params = data;
        } else {
            config.data = data;
        }

        const response = await api.request(config);

        // Handle HTTP errors
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        // Handle network errors or HTTP errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // other than 2xx
            throw new Error(`Server error: ${error.response.status}`);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(`Request setup error: ${error.message}`);
        }
    }
};
