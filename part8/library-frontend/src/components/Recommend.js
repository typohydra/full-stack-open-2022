import { ALL_BOOKS, ME } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = ({show}) => {
    const result = useQuery(ME, {
      skip: !show
    })

    const favGenre = result.data?.me?.favouriteGenre

    const genreResult = useQuery(ALL_BOOKS, {
      skip: !show && !favGenre,
      variables: { genre: favGenre},
      fetchPolicy: 'no-cache'
    })
  
    if (!show) {
      return null
    }
  
    if (result.loading || genreResult.loading) {
      return <div>loading...</div>;
    }
  
    const favGenreBooks = genreResult.data.allBooks
  
    return (
      <div>
        <h2>recommendations</h2>
        <p>books in your favourite genre <b>{favGenre}</b></p>
  
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {favGenreBooks.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) 
}

export default Recommend