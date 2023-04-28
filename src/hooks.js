import { useEffect, useState } from 'react';

const useStorage = (key, initialData) => {
    const [storedData, setStoredData] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialData;
        } catch (error) {
            console.error(error);

            return initialData;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedData));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedData]);

    return [storedData, setStoredData];
};

export default useStorage;
