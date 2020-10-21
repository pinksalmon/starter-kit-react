import React from "react";

import { fetchAnimals } from "../api/fetch-animals";
import { AnimalListPanel } from "./example-toolbox/animal-list-panel";
import { useApi } from "../hooks/use-api";

export const UseApiHookComponent = () => {
    const [ animals, isLoadingAnimals, isLoadedAnimals, $fetchAnimals ] = useApi(fetchAnimals);

    (window as any).$fetchAnimals = $fetchAnimals;

    return (
        <AnimalListPanel 
            panelTitle="Use Api Hook Component"
            animals={animals}
            isLoadingAnimals={isLoadingAnimals}
        />
    )
};