const Person = ({name, number}) => (
  <li>{name} {number}</li>
)

const Persons = ({persons, newFilter}) => {
  const peopleToShow = newFilter.length
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons
  
  return (
    <ul>
      {
        peopleToShow.map(person =>
          <Person key={person.name} 
                  name={person.name} 
                  number={person.number} 
          />
      )}
    </ul>
  )
}

export default Persons