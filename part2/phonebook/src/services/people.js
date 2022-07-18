import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => response.data)
)

const create = (person) => (
  axios
    .post(baseUrl, person)
    .then(response => response.data)
)

const deletePerson = (id) => (
  axios
    .delete(`${baseUrl}/${id}`, id)
)

export default { getAll, create, deletePerson }