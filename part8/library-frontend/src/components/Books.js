import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './Queries'
import { useState } from 'react'
import Book from './Book'

const Books = (props) => {
  const responseB = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (responseB.loading) return <div>loading...</div>

  if (!props.show) {
    return null
  }

  const books = responseB.data.allBooks
  const genresList = books.map((a) => (a.genres.map((g) => g))).flatMap(g => g)
  const genres = [...new Set(genresList)]

  console.log('genres:', genres)

if (filter){
  return (
    <div>
      <h2>books</h2>
      <div>
        {genres.map((g) => (
          <button onClick={() => setFilter(g)} key={g}> {g} </button>
        ))}
      </div>

      <Book filter={filter} />

    </div>
  )
} else {
  return (
    <div>
    <h2>books</h2>
      <div>
        {genres.map((g) => (
          <button onClick={() => setFilter(g)} key={g}> {g} </button>
        ))}
      </div>
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
}}


export default Books