import * as React from "react";
import { Component } from "react";
import { fetchAnimals } from "../../api/fetch-animals";
import { Animal } from "../../types/animal";
import { AnimalListPanel } from "./example-toolbox/animal-list-panel";

interface IState {
    isLoadingAnimals: boolean,
    animals: Animal[]
}

export class BasicClassComponent extends Component<{}, IState> {
    state: IState = {
        isLoadingAnimals: true,
        animals: []
    };

    componentDidMount() {
        this.loadAnimals();
    }

    async loadAnimals() {
        const animals = await fetchAnimals();

        this.setState({ 
            animals, 
            isLoadingAnimals: false 
        });
    }

    render() {
        return (
            <AnimalListPanel 
                panelTitle="Class Component"
                animals={this.state.animals}
                isLoadingAnimals={this.state.isLoadingAnimals}
            />
        )
    }
}