import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {


    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch(err => {
                console.error('cannot load toy to edit', err);
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price || !toyToEdit.name) {
            showErrorMsg('Please fill all fields')
            return
        }
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy saved succesfully')
                navigate('/toy')
            })
            .catch(err => {
                console.error('Cannot save toy', err);
                showErrorMsg('Cannot save toy')
            })
    }


    return (
        <section className="toy-edit">
            <form onSubmit={(ev) => onSaveToy(ev)}>
                <label htmlFor="name-edit">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name-edit"
                    placeholder="Enter new name"
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price-edit">Price:</label>
                <input
                    type="number"
                    name="price"
                    id="price-edit"
                    placeholder="Enter new price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
        </section>
    )
}