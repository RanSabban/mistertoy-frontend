import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { Link } from "react-router-dom";
import { toyService } from "../services/toy.service.js";
import { Button } from "@mui/material";

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('index => cannot load toys', err);
                throw err
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed succesfully')
            })
            .catch(err => {
                console.error('cannot remove toy', err)
                showErrorMsg('Cannot remove toy sorry')
                throw err
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function getNames() {
        const toysToReturn = toys.map(toy => toy.name)
        const uniqueToys = toysToReturn.reduce((acc, toy) => {
            if (!acc.includes(toy)) {
                acc.push(toy)
            }
            return acc
        }, [])
        return uniqueToys
    }

    console.log(toys);

    return (
        <section className="toy-index">
            <h1>Toy Collection</h1>
            <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} toysNames={getNames()} />
            <Button variant="contained"><Link to={'/toy/edit'}>Add toy</Link></Button>
            {!isLoading ?
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                : <div className="loader"><span>III</span></div>
            }
            {!toys.length ? 
            <div className="no-toys">No toys to show !</div> : <></>}
        </section>
    )
}