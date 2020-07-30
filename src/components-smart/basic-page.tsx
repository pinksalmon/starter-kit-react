import React, { FunctionComponent } from "react";

import { useAsync } from "../hooks/use-async";
import { getAnimals } from "../api/get-animals";

type BasicPageProps = {}

export const BasicPage: FunctionComponent<BasicPageProps> = () => {
    const [data, isLoading, isLoaded, refetch] = useAsync(getAnimals);

    return (
        <div>
            This is the Home Page
            <br />
            isLoading: {isLoading ? 'true' : 'false'}
            <br />
            isLoaded: {isLoaded ? 'true' : 'false'}
            <br />
            data: {data}
        </div>
    )
};