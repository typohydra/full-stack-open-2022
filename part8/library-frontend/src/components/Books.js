import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = ({show}) => {
  const result = useQuery(ALL_BOOKS, {
    skip: !show,
  })

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  
  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
