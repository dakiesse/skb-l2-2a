import * as model from '../models/pokemons.json';

function ascendingSort(v1, v2) {
    if (v1 > v2) return 1;
    if (v1 < v2) return -1;
    return 0;
}

function descendingSort(v1, v2) {
    if (v1 > v2) return -1;
    if (v1 < v2) return 1;
    return 0;
}

export default class Pokemon {
    constructor() {
        this.data = model.default;
    }

    // Сортировка [a, b, c]
    sortByField(field, isAscending = true) {
        let sortMethod = isAscending ? ascendingSort : descendingSort;

        this.data = this.data.sort((v1, v2) => {
            let result = sortMethod(v1[field], v2[field])

            if (field !== 'name' && result === 0) {
                return ascendingSort(v1.name, v2.name);
            }

            return result;
        });

        return this;
    }

    sortAngular() {
        this.sortByField('name');
        this.data.map(pokemon => { pokemon.angular = pokemon.weight / pokemon.height; return pokemon; });
        this.sortByField('angular');

        return this;
    }

    sortFat() {
        this.sortByField('name');
        this.data.map(pokemon => { pokemon.fat = pokemon.weight / pokemon.height; return pokemon; });
        this.sortByField('fat', false);

        return this;
    }

    toArrayOnly(field) {
        return this.data.map(pokemon => pokemon[field]);
    }
}
