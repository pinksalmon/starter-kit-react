import { Animal } from "../types/animal";

export const fetchAnimals = () => new Promise<Animal[]>(resolve => {
    const mockAnimals: Animal[] = [
        { id: 12, name: 'Rhino' },
        { id: 21, name: 'Zebra' },
        { id: 177, name: 'Gorilla' },
    ];

    setTimeout(() => {
        resolve(mockAnimals);
    } , 10000);
});