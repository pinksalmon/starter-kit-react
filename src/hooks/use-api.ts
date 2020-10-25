import { useState, useEffect } from 'react';

type UseApiHookData<T extends any[]> = 
    T & {
        asMap: { [index:number]: T[0] },
        setState: (t: T | undefined) => void
    }

type UseApiHookDataScalar<T> = 
    T & {
        setState: (t: T | undefined) => void
    }

export type UseApiHookResponse<T extends any[], K extends any[]> = [
    UseApiHookData<T>, // response data type
    boolean, // isLoading
    boolean, // isLoaded
    boolean, // hasError
    (...args: K) => void, // handle to call api function, updating hook state data if appropriate
];

export type UseApiHookResponseScalar<T, K extends any[]> = [
    UseApiHookDataScalar<T>, // response data type
    boolean, // isLoading
    boolean, // isLoaded
    boolean, // hasError
    (...args: K) => void, // handle to call api function, updating hook state data if appropriate
];

export type UseApiHookConfig<T, K extends any[]> = {
    args?: K,
    when?: boolean[], 
    key?: string,
    onError?: (e: any) => void,
    onSuccess?: (response: T) => void
}

const _useApi = (getPromise: any, useApiConfig: any) => {
    const [ didHandleInitialRequest, setDidHandleInitialRequest ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ hasError, setHasError ] = useState(false);
    const [ data, setData ] = useState<any>();
    const [ dataMap, setDataMap ] = useState<{ [index:number]: any }>({});

    const makeMapFromData = (data: any) => {
        const result: { [index:number]: any } = {};

        if (data && Array.isArray(data)) {
            const keyName = useApiConfig?.key || 'id';
            data.forEach(d => {
                const key = d[keyName];
                result[key] = d;
            });
        }

        return result;
    }

    const handlePromise = (promise: Promise<any>) => 
        promise
            .then((response) => {
                setData(response);
                const dataMap = makeMapFromData(response);
                setDataMap(dataMap);
                setIsLoading(false);
                setIsLoaded(true);

                if (useApiConfig?.onSuccess) {
                    useApiConfig.onSuccess(response);
                }
            })
            .catch((e) => {
                setIsLoading(false);
                setHasError(true);

                if (useApiConfig?.onError) {
                    useApiConfig.onError(e);
                }

                throw e;
            })

    function refetch() {
        setHasError(false);
        setIsLoading(true);
        setIsLoaded(false);
        const promise = ((getPromise as any).apply(null, arguments) as Promise<any>);
        handlePromise(promise);
    }

    useEffect(() => {
        if (didHandleInitialRequest)
            return;

        const areWinConditionsSatisfied = useApiConfig?.when == undefined || useApiConfig?.when.every((d: any) => d);

        if (areWinConditionsSatisfied) {
            setDidHandleInitialRequest(true);

            const promise = useApiConfig?.args != undefined
                ? getPromise(...useApiConfig?.args)
                : (getPromise as any)();

            handlePromise(promise);
        }
    });

    if (Array.isArray(data)) {
        (data as any).asMap = dataMap;
    }

    if (data) {
        data.setState = (t: any) => {
            setData(t);
            const dataMap = makeMapFromData(t);
            setDataMap(dataMap);
        };
    }

    return [ data, isLoading, isLoaded, hasError, refetch ];
}

let useApi: <T extends any[], K extends any[]>(
    getPromise: (...args: K) => Promise<T>, 
    useApiConfig?: UseApiHookConfig<T, K>
) => UseApiHookResponse<T, K>;

let useApiScalar: <T, K extends any[]>(
    getPromise: (...args: K) => Promise<T>, 
    useApiConfig?: UseApiHookConfig<T, K>
) => UseApiHookResponseScalar<T, K>;

useApi = _useApi as any;

useApiScalar = _useApi as any;

export { useApi, useApiScalar }
