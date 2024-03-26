import { toyService } from "../../services/toy.service";
import { store } from "../store";
import { SET_TOYS,SET_IS_LOADING, REMOVE_TOY, UPDATE_TOY, ADD_TOY, SET_FILTER_BY } from "../reducers/toy.reducer";

export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({type:SET_IS_LOADING, isLoading: true})
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({type: SET_TOYS, toys})
        })
        .catch(err => {
            console.log('cannot load toys' , err); 
            throw err
        })
        .finally(() => {
            store.dispatch({type:SET_IS_LOADING, isLoading: false})
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({type: REMOVE_TOY, toyId })
        })
        .catch((err) => {
            console.log('cannot remove toy', err);
            throw err
        })
}

export function saveToy(toyToSave) {
    const type = toyToSave._id ? UPDATE_TOY : ADD_TOY
        return toyService.save(toyToSave)
            .then(savedToy => {
                store.dispatch({type, toy: savedToy})
            })
            .catch( err => {
                console.error('cannot save toy', err);
                throw err
            })
}

export function setFilterBy(filterBy) {
    store.dispatch({type: SET_FILTER_BY, filterBy})
}
