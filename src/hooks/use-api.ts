import { useState, useEffect } from 'react';

export type UseApiHookResponse<T, K extends any[]> = [
    T | undefined, // response type
    boolean, // isLoading
    boolean, // isLoaded
    (...args: K) => void // re-call function
];

export type UseApiHookConfig<K extends any[]> = {
    args?: K,
    when?: boolean[]
}

export const useApi = <T, K extends any[]>(getPromise: (...args: K) => Promise<T>, useApiConfig?: UseApiHookConfig<K>) => { 
    const [ didAsyncOperation, setDidAsyncOperation ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ data, setData ] = useState<T>();

    useEffect(() => {
        if (didAsyncOperation)
            return;

        if (useApiConfig?.when == undefined || useApiConfig?.when.every(d => d)) {
            setDidAsyncOperation(true);

            let promise: Promise<T>;

            if (useApiConfig?.args != undefined) {
                promise = getPromise(...useApiConfig?.args);
            } else {
                promise = (getPromise as any)();
            }

            promise
                .then((response) => {
                    setData(response);
                    setIsLoading(false);
                    setIsLoaded(true);
                })
                .catch((e) => {
                    setIsLoading(false);
                    throw e;
                })
        }
    })

    function refetch(...args: K) {
        setIsLoading(true);
        setIsLoaded(false);

        ((getPromise as any).apply(null, arguments) as Promise<any>)
            .then((response) => {
                setData(response);
                setIsLoading(false);
                setIsLoaded(true);
            })
            .catch((e) => {
                setIsLoading(false);
                throw e;
            })
    }

    const hookResponse: UseApiHookResponse<T, K> = [data, isLoading, isLoaded, refetch];

    return hookResponse;
}