import React from "react";

import { fetchAnimals, fetchFavoriteAnimal } from "../../api/fetch-animals";
import { AnimalListPanel } from "./example-toolbox/animal-list-panel";
import { useApi, useApiScalar } from "../../hooks/use-api";

export const ExampleUseApiComponent = () => {
    const [ animals, setAnimals, $fetchAnimals ] = useApi(fetchAnimals);

    return (
        <AnimalListPanel 
            panelTitle="Use Api Hook Component"
            animals={animals.data}
            isLoadingAnimals={animals.isLoading}
        />
    )
};