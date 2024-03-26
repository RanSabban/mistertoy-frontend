import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy, 
}

function query(filterBy = {})  {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!toys.length){
              toys = _createToys()
              _save(STORAGE_KEY, toys) 
            }  
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
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


// PRIVATE FUNCS

function _createToys(){
    return [
        {
          _id: 't101',
          name: 'Talking Doll',
          price: 123,
          labels: ['Doll', 'Battery Powered', 'Baby'],
          createdAt: 1631031801011,
          inStock: true
        },
        {
          _id: 't102',
          name: 'Musical Teddy Bear',
          price: 99,
          labels: ['Battery Powered', 'Musical', 'Baby'],
          createdAt: 1635171600000, // October 25, 2021
          inStock: false
        },
        {
          _id: 't103',
          name: 'Remote Control Car',
          price: 45,
          labels: ['Toy', 'Battery Powered', 'On wheels'],
          createdAt: 1639362000000, // December 13, 2021
          inStock: true
        },
        {
          _id: 't104',
          name: 'Interactive Storybook',
          price: 79,
          labels: ['Book', 'Art', 'Baby'],
          createdAt: 1643528400000, // January 30, 2022
          inStock: true
        },
        {
          _id: 't105',
          name: 'Building Blocks Set',
          price: 29,
          labels: ['Puzzle', 'Kids'],
          createdAt: 1647541200000, // March 18, 2022
          inStock: true
        }
      ];
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}