import axios from "axios";
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (nObject) => {
    const request = axios.post(baseUrl, nObject)
    return request.then(response => response.data)
}

const update = (id, nObject) => {
    const request = axios.put(`${baseUrl}/${id}`, nObject)
    return request.then(response => response.data)
}

const noteService = {getAll, create, update}

export default noteService;