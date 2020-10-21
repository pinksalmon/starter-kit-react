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
    padding: "16px",
    fontSize: '24px'
}

export const AnimalListPanel = (props: IAnimalListPanelProps) => (
    <div style={rootStyles}>
        <div className="panel-title" style={{ paddingBottom: "16px", marginBottom: "16px", borderBottom: "2px solid #bbb"}}>
            {props.panelTitle}
        </div>

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
)