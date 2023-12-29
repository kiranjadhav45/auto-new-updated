import { jwtDecode } from "jwt-decode";
import { domain } from './conf';
import axios from 'axios';

export const PutApi = async (payload) => {
    console.log(payload, "payload from put api")
    const { url, data, id } = payload;
    const userData = JSON.stringify(data);

    try {
        const newUrl = `${domain}${url}`;
        console.log(newUrl, "newUrl")
        const bearerToken = localStorage.getItem('token');
        const decoded = jwtDecode(bearerToken);
        const user_id = decoded.user_id;

        const headers = {
            'Content-Type': 'application/json',
        };

        if (bearerToken) {
            headers['user_id'] = `${user_id}`;
        }
        const apiResponse = await axios.put(newUrl, userData, { headers });
        return apiResponse.data;
    } catch (error) {
        return error;
    }
};
