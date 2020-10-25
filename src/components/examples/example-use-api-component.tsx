import React from "react";

import { fetchAnimals } from "../../api/fetch-animals";
import { AnimalListPanel } from "./example-toolbox/animal-list-panel";
import { useApiScalar } from "../../hooks/use-api";

export const ExampleUseApiComponent = () => {
    const [ animals, isLoadingAnimals ] = useApiScalar(fetchAnimals);

    return (
        <AnimalListPanel 
            panelTitle="Use Api Hook Component"
            animals={animals}
            isLoadingAnimals={isLoadingAnimals}
        />
    )
};