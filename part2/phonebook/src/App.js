import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import peopleServices from './services/people'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('')

  useEffect(() => {
    peopleServices
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null)
    }, 3000) 
    return () => clearTimeout(timeout)
  }, [notification])

  const checkIfNameExists = (name) => {
    return persons.find( person => person.name === name)
  } 

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    
    const existingPerson = checkIfNameExists(newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        peopleServices
          .update(existingPerson.id, person)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            
            setNotification(`Added ${person.name}`)
            setNotificationStyle('success')
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== existingPerson.id))
            
            setNotification(`Information of ${person.name} has already been removed from server`)
            setNotificationStyle('error')
          })
      }
    }
    else {
      peopleServices
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          
          setNotification(`Added ${person.name}`)
          setNotificationStyle('success')
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handlePersonDelete = (id) => {
    const name = persons.find(person => person.id === id).name
    if(window.confirm(`Delete ${name}?`)) {
      peopleServices 
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))

          setNotification(`Deleted ${name}`)
          setNotificationStyle('success')
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== id))
          
          setNotification(`Information of ${name} has already been removed from server`)
          setNotificationStyle('error')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} style={notificationStyle} />
      <Filter 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange} 
      />
      <h2>add a new</h2>
      <PersonForm  
        addPerson={addPerson}
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        newFilter={newFilter}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  )
}

export default App