import React, { FunctionComponent, useEffect } from "react";

import { useApi } from "../hooks/use-api";
import { fetchAnimals } from "../api/fetch-animals";

type BasicPageProps = {}

export const HomePage: FunctionComponent<BasicPageProps> = () => {
    const [ animals, isLoadingAnimals, isLoadedAnimals, refetchAnimals, animalMap ] = useApi(fetchAnimals);

    const [ myFavoriteAnimal, isLoadingMyFavoriteAnimal, isLoadedMyFavoriteAnimal ] = 
        useApi(fetchAnimals, {
            args: [ 1 ],
        });

    const [ moreAnimals, isLoadingMoreAnimals, isLoadedMoreAnimals ] = 
        useApi(fetchAnimals, {
            when: [ isLoadedAnimals ]
        });

    useEffect(() => {
        setTimeout(() => {
            refetchAnimals(2);
        }, 6000);
    }, [])

    return (
        <div>
            This is the Home Page
            <br />
            <br />
            isLoadingAnimals: {isLoadingAnimals ? 'true' : 'false'}
            <br />
            isLoadedAnimals: {isLoadedAnimals ? 'true' : 'false'}
            <br />
            animals: {animals && animals.map(a => a.name)}
            <br />
            <br />
            isLoadingMyFavoriteAnimal: {isLoadingMyFavoriteAnimal ? 'true' : 'false'}
            <br />
            isLoadedMyFavoriteAnimal: {isLoadedMyFavoriteAnimal ? 'true' : 'false'}
            <br />
            myFavoriteAnimal: {myFavoriteAnimal && myFavoriteAnimal[0].name}
            <br />
            <br />
            isLoadingMoreAnimals: {isLoadingMoreAnimals ? 'true' : 'false'}
            <br />
            isLoadedMoreAnimals: {isLoadedMoreAnimals ? 'true' : 'false'}
            <br />
            more animals: {moreAnimals && moreAnimals.map(a => a.name)}
        </div>
    )
};