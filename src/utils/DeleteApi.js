import { jwtDecode } from "jwt-decode";
import { domain } from './conf';
import axios from 'axios';

export const DeleteApi = async (deletePayloadData) => {
    const { url, id } = deletePayloadData
    console.log(url, id)
    try {
        const newUrl = `${domain}${url}${id}`;
        const bearerToken = localStorage.getItem('token');
        const decoded = jwtDecode(bearerToken);
        const user_id = decoded.user_id;

        const headers = {
            'Content-Type': 'application/json',
        };

        if (bearerToken) {
            headers['user_id'] = `${user_id}`;
        }

        const apiResponse = await axios.delete(newUrl, { headers });
        return apiResponse.data;
    } catch (error) {
        return error;
    }
};
