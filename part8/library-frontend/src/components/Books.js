import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

const Books = ({show}) => {
  const [filter, setFilter] = useState('')
  const result = useQuery(ALL_BOOKS, {
    skip: !show
  })
  const genreResult = useQuery(ALL_BOOKS, {
    skip: !show && !filter,
    variables: { genre: filter }
  })

  if (!show) {
    return null
  }

  if (result.loading || genreResult.loading) {
    return <div>loading...</div>;
  }
  
  const books = result.data.allBooks
  // for buttons
  const uniqueGenres = [...new Set(books.map(book => book.genres).flat(1))]
  // for list display
  const genreBooks = genreResult.data.allBooks
  
  const handleGenreChange = (genre) => {
    setFilter(genre)
  }

  return (
    <div>
      <h2>books</h2>

      <p>in genre <b>{filter ? filter : 'all genres'}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div>
        {uniqueGenres.map(genre => (
          <button key={genre} onClick={() => handleGenreChange(genre)}>{genre}</button>
        ))}
        <button onClick={() => handleGenreChange('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
