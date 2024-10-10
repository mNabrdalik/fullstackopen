import axios from 'axios'
const dataUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(dataUrl)
}

const create = newContact => {
    return axios.post(dataUrl, newContact)
}

const updateOne = (id, person) => {
    return axios.put(`${dataUrl}/${id}`, person)
}

const deleteOne = id => {
    return axios.delete(`${dataUrl}/${id}`)
}
  
export default { getAll, create, updateOne, deleteOne}