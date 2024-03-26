import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service";

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToUpdate, setFilterByToUpdate] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToUpdate)
    }, [filterByToUpdate])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value
        console.log(value, field, type);
        setFilterByToUpdate((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleChangeStock({ target }) {
        let { value } = target
        console.log(value);
        setFilterByToUpdate((prevFilter) => ({ ...prevFilter, ['stock']: value }))
    }

    function handleChangeLabel({ target }) {
        let { value } = target
        setFilterByToUpdate((prevFilter) => ({ ...prevFilter, ['label']: value }))
    }

    function setSortBy(field) {
        const { sortBy } = filterByToUpdate
        if (field === 'createdAt') {
            const diff = sortBy.createdAt ? 1 : -1
            setFilterByToUpdate((prevFilter) => ({ ...prevFilter, sortBy: { [field]: diff } }))
        }
        if (field === 'name') {
            const diff = sortBy.name ? 1 : -1
            setFilterByToUpdate((prevFilter) => ({ ...prevFilter, sortBy: { [field]: diff } }))
        }
        if (field === 'price') {
            const diff = sortBy.price ? 1 : -1
            setFilterByToUpdate((prevFilter) => ({ ...prevFilter, sortBy: { [field]: diff } }))
        }
    }
    return (
        <section className="toy-filter">
            <h1>Filter Toys</h1>
            <form onSubmit={(ev) => ev.preventDefault()}>
                <label htmlFor="filter-name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="filter-name"
                    placeholder="By name"
                    value={filterByToUpdate.name}
                    onChange={handleChange}
                />
                <label htmlFor="filter-price">Price</label>
                <input
                    type="number"
                    name="price"
                    id="filter-price"
                    placeholder="By price"
                    value={filterByToUpdate.price}
                    onChange={handleChange}
                />
            </form>
            <select onChange={(ev) => handleChangeStock(ev)} name="filter-stock" id="filter-stock">
                <option value="all">All</option>
                <option value="stock">In stock</option>
                <option value="notstock">Not in stock</option>
            </select>
            <select onChange={(ev) => handleChangeLabel(ev)} name="filter-stock" id="filter-stock">
                <option value="">Label</option>
                <option value="On wheels">On wheels</option>
                <option value="Box game">Box game</option>
                <option value="Art">Art</option>
                <option value="Baby">Baby</option>
                <option value="Doll">Doll</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Battery Powered">Battery Powered</option>
            </select>
            <section className="toy-sort">
                <button className="sort-btn" onClick={() => setSortBy('createdAt')}>Created</button>
                <button className="sort-btn" onClick={() => setSortBy('name')}>Name</button>
                <button className="sort-btn" onClick={() => setSortBy('price')}>Price</button>
            </section>
        </section>
    )


}