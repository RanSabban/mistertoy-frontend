import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { loadToys } from "../store/actions/toy.actions";
import { ToyList } from "../cmps/ToyList";

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    console.log(toys);
    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('index => cannot load toys', err);
                throw err
            })
    },[])

    return (
        <section className="toy-index">
            <h1>Toy Collection</h1>
            {!isLoading ? 
            <ToyList toys={toys}/>
        : <div className="loader"><span>III</span></div>
        }
        </section>
    )
}