import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const create = (personObject) => {
    return axios.post(baseURL, personObject)
}

const update = () => {}

const remove = () => {}

const Book = {getAll, create, update, remove}

export default Book;