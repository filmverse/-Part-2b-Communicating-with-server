import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const create = (personObject) => {
    return axios.post(baseURL, personObject)
}

const update = (id, personObject) => {
    return axios.put(`${baseURL}/${id}`, personObject)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const Book = {getAll, create, update, remove}

export default Book;