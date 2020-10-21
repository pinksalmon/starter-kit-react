import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { AnimalListPanel } from "./example-toolbox/animal-list-panel";
import { store } from "./example-toolbox/animal-store";

export const ExampleFluxComponent = observer(() => {
    useEffect(() => {
        store.loadAnimals();
    }, []);

    return (
        <AnimalListPanel 
            panelTitle="Flux Component"
            animals={store.data}
            isLoadingAnimals={store.isLoading}
        />
    )
});
