import { useState, useEffect } from "react";
import AuthToken from "../utils/AuthToken";

const DeleteServerData = (url, id) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const token = AuthToken();
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return { data, error, loading };
};

export default DeleteServerData;
