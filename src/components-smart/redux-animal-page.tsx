import { useEffect } from "react";
import { useAppDispatch, RootState } from "../store";
import { fetchAnimals } from "../store/animals";
import { useSelector } from "react-redux";
import React from "react";

export const ReduxAnimalPage = () => {
    const dispatch = useAppDispatch();

    // how to dispatch async action
    useEffect(() => {
        dispatch(fetchAnimals());
    }, []);

    // how to get data from store
    const firstAnimal = useSelector((state: RootState) => state.animal.data[0]);

    return (
        <div>
            first animal: {firstAnimal}
        </div>
    );
}