type Animal = { id: number, name: string };

const mockAnimals: Animal[] = [
    { id: 1, name: 'Rhino' },
    { id: 2, name: 'Zebra' },
    { id: 3, name: 'Gorilla' },
];

export const fetchAnimals = (numToFetch?: number) => 
    new Promise<typeof mockAnimals>(resolve => {
        setTimeout(() => {
            resolve(mockAnimals.slice(0, numToFetch))
        } , 3000);
    });