// import { useState, useEffect } from 'react';
// import { domain } from "./conf"
// import axios from 'axios';

// const usePostApi = (url, data) => {
//     const [response, setResponse] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const NewUrl = `${domain}${url}`
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const apiResponse = await axios.post(NewUrl, data);
//                 setResponse(apiResponse.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [url, data]);

//     return { response, loading, error };
// };

// export default usePostApi;


import { useState, useEffect } from 'react';
import { domain } from './conf';
import axios from 'axios';

export const PostApi = (url, data) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const NewUrl = `${domain}${url}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

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
                setResponse(apiResponse.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { response, loading, error };
};

// export default PostApi;
