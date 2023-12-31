import { jwtDecode } from "jwt-decode";
import { domain } from './conf';
import axios from 'axios';

export const PostApi = async (payload) => {
    const { url, data } = payload
    const userData = JSON.stringify(data)
    try {
        const NewUrl = `${domain}${url}`;
        // Check if there is a bearer token available in localStorage or some other storage
        const bearerToken = localStorage.getItem('token');
        const decoded = jwtDecode(bearerToken);
        const user_id = decoded.user_id
        // console.log(decoded, "decoded")
        const headers = {
            'Content-Type': 'application/json', // Adjust the content type as needed
        };
        // Include the Authorization header if a bearer token is available
        if (bearerToken) {
            headers['user_id'] = `${user_id}`;
            headers['id'] = `${user_id}`;
        }

        const apiResponse = await axios.post(NewUrl, userData, { headers });
        return apiResponse.data
    } catch (error) {
        return error;
    }
};


