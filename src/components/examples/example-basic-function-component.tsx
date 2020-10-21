import React, { useEffect } from "react";
import { useState } from "react";
import { fetchAnimals } from "../../api/fetch-animals";
import { Animal } from "../../types/animal";
import { AnimalListPanel } from "./example-toolbox/animal-list-panel";

export const BasicFunctionComponent = () => {
    const [isLoadingAnimals, setIsLoadingAnimals] = useState(true);
    const [animals, setAnimals] = useState<Animal[]>([]);

    const loadAnimals = async () => {
        const animals = await fetchAnimals();
        setAnimals(animals);
        setIsLoadingAnimals(false);
    }

    useEffect(() => {
        loadAnimals();
    }, []);

    return (
        <AnimalListPanel 
            panelTitle="Function Component"
            animals={animals}
            isLoadingAnimals={isLoadingAnimals}
        />
    )
}