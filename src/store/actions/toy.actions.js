import { toyService } from "../../services/toy.service";
import { store } from "../store";
import { SET_TOYS,SET_IS_LOADING, REMOVE_TOY, UPDATE_TOY, ADD_TOY, SET_FILTER_BY } from "../reducers/toy.reducer";

export async function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({type:SET_IS_LOADING, isLoading: true})
    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({type: SET_TOYS, toys})
    }

    catch (err) {
        console.log('Cannot load toys', err);
    }

    finally {
        store.dispatch({type:SET_IS_LOADING, isLoading:false})
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({type:REMOVE_TOY, toyId})
    }

    catch (err) {
        console.log('Cannot remove toy', err);
    }
}

export async function saveToy(toyToSave) {
    const type = toyToSave._id ? UPDATE_TOY : ADD_TOY
    try {
        const savedToy = await toyService.save(toyToSave)
        store.dispatch({type,toy:savedToy})

    }
    catch (err) {
        console.error('cannot save toy', err);
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({type: SET_FILTER_BY, filterBy})
}
