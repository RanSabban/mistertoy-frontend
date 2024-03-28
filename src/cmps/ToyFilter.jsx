import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service";
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toyService } from "../services/toy.service"
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';




export function ToyFilter({ filterBy, onSetFilter, toysNames }) {
    const [filterByToUpdate, setFilterByToUpdate] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    const { sortByIc } = filterBy

    useEffect(() => {
        onSetFilter.current(filterByToUpdate)
    }, [filterByToUpdate])

    function handleChange({ target }) {
        console.log(target);
        let { value, name: field, type } = target
        if (type === 'number') value = +value
        setFilterByToUpdate((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleChangeSearch({ target }) {
        let { value } = target
        console.log(value);
        setFilterByToUpdate((prevFilter) => ({ ...prevFilter, ['name']: value }))
    }

    function handleChangeStock({ target }) {
        let { value } = target
        console.log(value);
        setFilterByToUpdate((prevFilter) => ({ ...prevFilter, ['stock']: value }))
    }

    function handleChangeLabel({ target }) {
        let { value } = target
        console.log(value);
        setFilterByToUpdate((prevFilter) => ({ ...prevFilter, ['label']: value }))
    }

    function setSortBy(field) {
        const { sortBy } = filterByToUpdate
        console.log(sortBy);
        if (field === 'createdAt') {
            const diff = sortBy.createdAt === 1 ? -1 : 1
            setFilterByToUpdate((prevFilter) => ({ ...prevFilter, sortBy: { [field]: diff } }))
        }
        if (field === 'name') {
            const diff = sortBy.name === 1 ? -1 : 1
            setFilterByToUpdate((prevFilter) => ({ ...prevFilter, sortBy: { [field]: diff } }))
        }
        if (field === 'price') {
            const diff = sortBy.price === 1 ? -1 : 1
            setFilterByToUpdate((prevFilter) => ({ ...prevFilter, sortBy: { [field]: diff } }))
        }
    }

    console.log(filterByToUpdate);

    if (!toysNames) return <div>loading</div>
    return (<>
        <section className="toy-filter">
            <h1>Filter Toys</h1>
            <form className="form-filter-name-price" onSubmit={(ev) => ev.preventDefault()}>
                <Autocomplete
                    disablePortal
                    id="filter-name"
                    options={toysNames}
                    sx={{ width: 300 }}
                    type="text"
                    name="name"
                    onInputChange={handleChangeSearch}
                    onSelect={handleChangeSearch}
                    renderInput={(params) => <TextField {...params} label="By Name" />}
                />
                <TextField
                    className="filter-price"
                    label="Price"
                    variant="standard"
                    inputProps={{ inputMode: 'numeric' }}
                    name="price"
                    id="filter-price"
                    value={filterByToUpdate.price}
                    onChange={handleChange}
                    sx={{ width: 75, my: 2 }}
                />
            </form>
            <section className="label-and-stock">
                <Box sx={{ minWidth: 120, my: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="filter-stock">Stock</InputLabel>
                        <Select
                            labelId="filter-stock"
                            id="select-filter-stock"
                            value={filterBy.stock}
                            label="Stock"
                            onChange={handleChangeStock}
                            autoWidth
                            sx={{ width: 150 }}
                        >
                            <MenuItem value={'all'}>All</MenuItem>
                            <MenuItem value={'stock'}>In stock</MenuItem>
                            <MenuItem value={'notstock'}>Not in stock</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120, my: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="filter-label">Label</InputLabel>
                        <Select
                            labelId="filter-label"
                            id="select-filter-label"
                            value={filterByToUpdate.label || 'All'}
                            label="Label"
                            onChange={handleChangeLabel}
                            autoWidth
                            sx={{ width: 150 }}
                        >
                            <MenuItem value={'all'}>All</MenuItem>
                            <MenuItem value={'On wheels'}>On wheels</MenuItem>
                            <MenuItem value={'Box game'}>Box game</MenuItem>
                            <MenuItem value={'Art'}>Art</MenuItem>
                            <MenuItem value={'Baby'}>Baby</MenuItem>
                            <MenuItem value={'Doll'}>Doll</MenuItem>
                            <MenuItem value={'Puzzle'}>Puzzle</MenuItem>
                            <MenuItem value={'Outdoor'}>Outdoor</MenuItem>
                            <MenuItem value={'Battery Powered'}>Battery Powered</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </section>
            <section className="toy-sort">
                <Button sx={{ mx: 1 }} className="sort-btn" onClick={() => setSortBy('createdAt')}>Created {filterBy.sortBy.createdAt ? (filterBy.sortBy.createdAt === 1 ? <SouthIcon /> : <NorthIcon />) : ''}</Button>
                <Button sx={{ mx: 1 }} className="sort-btn" onClick={() => setSortBy('name')}>Name {filterBy.sortBy.name ? (filterBy.sortBy.name === 1 ? <SouthIcon /> : <NorthIcon />) : ''}</Button>
                <Button sx={{ mx: 1 }} className="sort-btn" onClick={() => setSortBy('price')}>Price {filterBy.sortBy.price ? (filterBy.sortBy.price === 1 ? <SouthIcon /> : <NorthIcon />) : ''}</Button>
            </section>
        </section>
        {/* <section className="material-ui-test">
            <Autocomplete
                multiple
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                defaultValue={[top100Films[13]]}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="filterSelectedOptions"
                        placeholder="Favorites"
                    />
                )}
            />
        </section> */}
    </>
    )
}

