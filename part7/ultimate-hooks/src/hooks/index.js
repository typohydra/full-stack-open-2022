import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    setResources(resources.concat(response.data))
  }

  const service = {
    getAll,
    create
  }

  return [
    resources, service
  ]
}