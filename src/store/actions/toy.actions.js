import { toyService } from "../../services/toy.service";
import { store } from "../store";
import { SET_TOYS,SET_IS_LOADING } from "../reducers/toy.reducer";

export function loadToys() {
    store.dispatch({type:SET_IS_LOADING, isLoading: true})
    return toyService.query()
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

