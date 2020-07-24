export const getAnimals: () => Promise<string[]>
    = () => {
        const mockAnimals = [
            'Zebra',
            'Gorilla',
            'Rabbit'
        ]

        return new Promise(resolve => {
            setTimeout(() => resolve(mockAnimals) , 3000);
        });
    }