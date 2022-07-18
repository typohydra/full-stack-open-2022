const Person = ({name, number, id, handlePersonDelete}) => {
  return (
    <li>
      {name} {number}
      <button onClick={() => handlePersonDelete(id)}>delete</button>  
    </li>
  )
}

const Persons = ({persons, newFilter, handlePersonDelete}) => {
  const peopleToShow = newFilter.length
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons
  
  return (
    <ul>
      {
        peopleToShow.map(person =>
          <Person 
            key={person.name} 
            name={person.name} 
            number={person.number}
            id={person.id}
            handlePersonDelete={handlePersonDelete} 
          />
      )}
    </ul>
  )
}

export default Persons