import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Reccomendation from './components/Reccomendation'
import { CURRENT_USER, ADDED_BOOK, ALL_BOOKS } from './components/Queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const logout = () => {
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  useSubscription(ADDED_BOOK, {
    onData: ({ data }) => {
      const addedBook = data.data.addedBook
      alert(`${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  }
  )

  const response = useQuery(CURRENT_USER)
  if (response.loading) return <div>loading...</div>

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {localStorage.getItem('user-token')
          ? (<><button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recomend</button>
            <button onClick={logout}>logout</button></>)
          : (<button onClick={() => setPage('login')}>login</button>)
        }
      </div>

      <Authors show={page === 'authors'} token={localStorage.getItem('user-token')} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Login show={page === 'login'} setPage={setPage} />
      <Reccomendation show={page === 'recommend'} favGenre={response.data.me.favGenre} />

    </div>
  )
}

export default App
