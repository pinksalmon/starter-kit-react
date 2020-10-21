import { useState, useEffect } from 'react';

type UseApiHookData<T extends any[]> = 
    T & {
        asMap: { [index:number]: T[0] },
        setState: (t: T | undefined) => void
    }

export type UseApiHookResponse<T extends any[], K extends any[]> = [
    UseApiHookData<T>, // response data type
    boolean, // isLoading
    boolean, // isLoaded
    boolean, // hasError
    (...args: K) => void, // handle to call api function, updating hook state data if appropriate
];

export type UseApiHookConfig<K extends any[]> = {
    args?: K,
    when?: boolean[], 
    key?: string,
    onError?: (e: any) => void
}

export const useApi = <T extends any[], K extends any[]>(getPromise: (...args: K) => Promise<T>, useApiConfig?: UseApiHookConfig<K>) => { 
    const [ didHandleInitialRequest, setDidHandleInitialRequest ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ hasError, setHasError ] = useState(false);
    const [ data, setData ] = useState<T>();
    const [ dataMap, setDataMap ] = useState<{ [index:number]: T }>({});

    const makeMapFromData = (data?: T) => {
        const result: { [index:number]: T } = {};

        if (data) {
            const keyName = useApiConfig?.key || 'id';
            data.forEach(d => {
                const key = d[keyName];
                result[key] = d;
            });
        }

        return result;
    }

    const handlePromise = (promise: Promise<T>) => 
        promise
            .then((response) => {
                setData(response);
                const dataMap = makeMapFromData(response);
                setDataMap(dataMap);
                setIsLoading(false);
                setIsLoaded(true);
            })
            .catch((e) => {
                setIsLoading(false);
                setHasError(true);

                if (useApiConfig?.onError) {
                    useApiConfig.onError(e);
                }

                throw e;
            })

    function refetch(...args: K) {
        setHasError(false);
        setIsLoading(true);
        setIsLoaded(false);
        const promise = ((getPromise as any).apply(null, arguments) as Promise<any>);
        handlePromise(promise);
    }

    useEffect(() => {
        if (didHandleInitialRequest)
            return;

        if (useApiConfig?.when == undefined || useApiConfig?.when.every(d => d)) {
            setDidHandleInitialRequest(true);

            let promise: Promise<T>;

            if (useApiConfig?.args != undefined) {
                promise = getPromise(...useApiConfig?.args);
            } else {
                promise = (getPromise as any)();
            }

            handlePromise(promise);
        }
    });

    let useApiHookData: UseApiHookData<T>;

    useApiHookData = [...(data || [])] as any;
    useApiHookData!.asMap = dataMap;
    useApiHookData!.setState = (t) => {
        setData(t)
        const dataMap = makeMapFromData(t);
        setDataMap(dataMap);
    };

    const hookResponse: UseApiHookResponse<T, K> = [ useApiHookData, isLoading, isLoaded, hasError, refetch ];

    return hookResponse;
}
