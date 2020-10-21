import { types, flow } from "mobx-state-tree";
import { fetchAnimals } from "../../../api/fetch-animals";

const storeAnimal = types
    .model("animal", {
        id: types.number,
        name: types.string,
    });

export const store = types
   .model("storeAnimals", {
       data: types.array(storeAnimal),
       isLoading: types.boolean
   })
    .actions(self => {
        const loadAnimals = flow(function* () {
            self.isLoading = true;
            const animals = yield fetchAnimals();
            self.data = animals;
            self.isLoading = false;
        });

        return {
            loadAnimals
        }
    })
    .create({
        data: [],
        isLoading: false
    });
