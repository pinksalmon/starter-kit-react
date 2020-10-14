const mockAnimals = [
    'Zebra',
    'Gorilla',
    'Rabbit'
];

export const fetchAnimals = (numToFetch?: number) => 
    new Promise<typeof mockAnimals>(resolve => {
        setTimeout(() => {
            resolve(mockAnimals.slice(0, numToFetch))
        } , 3000);
    });