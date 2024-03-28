import { httpService } from "./http.service"

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getFilterBy,
}

function query(filterBy) {
    return httpService.get('toy', { params: {filterBy} })
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post(`toy`, toy)
    }
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function getEmptyToy() {
    return {
        name: '',
        price: 100,
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
}

function getFilterBy() {
    return {
        name: '',
        price: 0,
        stock: 'all',
        sortBy: {
            price: -1
        }
    }
}
