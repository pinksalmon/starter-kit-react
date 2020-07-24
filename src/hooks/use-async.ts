import { useState, useEffect } from 'react';

export const useAsync: <T>(promiseFactory: () => Promise<T>) => [T | undefined, Boolean, Boolean, () => Promise<void>] 
    = <T>(promiseFactory: () => Promise<T>) => { 
        const [isLoading, setIsLoading] = useState(true);
        const [isLoaded, setIsLoaded] = useState(false);
        const [data, setData] = useState<T>();

        const refetch = async () => {
            try {
                let promiseResponse = await promiseFactory();
                setData(promiseResponse);
                setIsLoading(false);
                setIsLoaded(true);
            } catch(e) {
                setIsLoading(false);
                throw e;
            }
        }

        useEffect(() => {
            refetch();
        })

        return [data, isLoading, isLoaded, refetch];
    }