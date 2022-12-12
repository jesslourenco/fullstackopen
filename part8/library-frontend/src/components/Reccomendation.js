/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { useQuery } from '@apollo/client'
import { BOOKS_ON_GENRE } from './Queries'

const Reccomendation = (props) => {

    const {loading, error, data } = useQuery(BOOKS_ON_GENRE, {
        variables: { genre: props.favGenre },
    })

    if(loading) return <div>loading...</div>
    if (!props.show) return null

    const books = data.allBooks
 
        return (
            <div>
              <h2>Book reccomendations</h2>  
              <p>based on your favorite genre: {props.favGenre}!</p>
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
export default Reccomendation