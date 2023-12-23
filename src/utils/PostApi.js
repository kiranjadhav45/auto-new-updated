import { useState, useEffect } from 'react';
import { domain } from './conf';
import axios from 'axios';

export const PostApi = async (payload) => {
    const { url, data } = payload
    try {
        const NewUrl = `${domain}${url}`;
        // Check if there is a bearer token available in localStorage or some other storage
        const bearerToken = localStorage.getItem('accessToken');

        const headers = {
            'Content-Type': 'application/json', // Adjust the content type as needed
        };

        // Include the Authorization header if a bearer token is available
        if (bearerToken) {
            headers['Authorization'] = `Bearer ${bearerToken}`;
        }

        const apiResponse = await axios.post(NewUrl, data, { headers });
        return apiResponse.data
    } catch (error) {
        return error;
    }
};

