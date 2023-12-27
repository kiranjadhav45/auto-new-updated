import { jwtDecode } from "jwt-decode";
import { domain } from './conf';
import axios from 'axios';

export const GetApi = async (url) => {
    // const url = '/v1/vendors'
    // const { url } = payload;
    try {
        const newUrl = `${domain}${url}`;
        const bearerToken = localStorage.getItem('token');
        const decoded = jwtDecode(bearerToken);
        const user_id = decoded.user_id;

        const headers = {
            'Content-Type': 'application/json',
        };

        if (bearerToken) {
            headers['user_id'] = `${user_id}`;
        }

        const apiResponse = await axios.get(newUrl, { headers });
        return apiResponse.data;
    } catch (error) {
        return error;
    }
};
