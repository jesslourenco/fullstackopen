import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {ALL_AUTHORS} from './components/Queries'
import {ALL_BOOKS} from './components/Queries'



const App = () => {
  const [page, setPage] = useState('authors')

  const responseA = useQuery(ALL_AUTHORS)
  if (responseA.loading) return <div>loading...</div>

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const responseB = useQuery(ALL_BOOKS)
  if (responseB.loading) return <div>loading...</div>
  

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} allAuthors={responseA.data.allAuthors} />

      <Books show={page === 'books'} allBooks={responseB.data.allBooks}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
