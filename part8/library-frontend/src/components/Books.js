import { useQuery } from '@apollo/client'
import {ALL_BOOKS} from './Queries'

const Books = (props) => {
  const responseB = useQuery(ALL_BOOKS)
  if (responseB.loading) return <div>loading...</div>

    if (!props.show) {
      return null
    }
  
    const books = responseB.data.allBooks
  
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
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  export default Books