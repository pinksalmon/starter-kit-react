import React, { CSSProperties } from "react";
import { LoadingDots } from "../../../components/loading-dots/loading-dots";
import { Animal } from "../../../types/animal";

interface IAnimalListPanelProps {
    panelTitle: string;
    isLoadingAnimals: boolean;
    animals: Animal[];
}

const rootStyles: CSSProperties = {
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "300px",
    fontSize: '24px'
}

const panelTitleStyles: CSSProperties = {
    padding: '16px',
    borderBottom: '2px solid rgb(187, 187, 187)',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center'
}

const panelContentStyles: CSSProperties = {
    padding: '16px',
}

export const AnimalListPanel = (props: IAnimalListPanelProps) => (
    <div style={rootStyles}>
        <div className="panel-title" style={panelTitleStyles}>
            {props.panelTitle}
        </div>

        <div className="panel-content" style={panelContentStyles}>
            {props.isLoadingAnimals && (
                <div>
                    Loading animals
                    <LoadingDots />
                </div>
            )}
            {!props.isLoadingAnimals && props.animals.map(animal => (
                <div key={animal.id}>
                    {animal.name}
                </div>
            ))}
        </div>
    </div>
)