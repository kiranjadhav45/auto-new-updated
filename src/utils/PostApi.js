import { jwtDecode } from "jwt-decode";
import { domain } from './conf';
import axios from 'axios';

export const PostApi = async (payload) => {
    const { url, data } = payload
    const userData = JSON.stringify(data)
    try {
        const NewUrl = `${domain}${url}`;
        const bearerToken = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
        };
        if (bearerToken) {
            const decoded = jwtDecode(bearerToken);
            const user_id = decoded.user_id;
            headers['user_id'] = `${user_id}`;
            // headers['id'] = `${user_id}`;
        } else {
            // Handle the scenario when the token is not available
            console.warn("Token not found in localStorage. Request will be sent without user_id in headers.");
        }
        const apiResponse = await axios.post(NewUrl, userData, { headers });
        return apiResponse.data
    } catch (error) {
        return error;
    }
};


