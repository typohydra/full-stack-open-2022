import { useState } from 'react'
import Select from 'react-select';
import { EDIT_BIRTHYEAR } from '../queries'
import { useMutation } from '@apollo/client'

const BirthForm = ({authors, setError}) => {
  const [selectedName, setSelectedName] = useState(null);
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_BIRTHYEAR, {
    onError: (error) => {
      error.graphQLErrors.length > 0
        ? setError(error.graphQLErrors[0].message)
        : setError('You need to fill in author\'s name and birthyear to update')
    } 
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({  variables: { name: selectedName?.value, setBornTo: Number(born) } })

    setSelectedName('')
    setBorn('')
  }

  const options = authors.map(author => (
    {
      value: author.name,
      label: author.name
    }
  ))

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedName}
          onChange={setSelectedName}
          options={options}
        />

        <div>
          born
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthForm
