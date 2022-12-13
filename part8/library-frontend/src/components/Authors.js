import { useQuery } from '@apollo/client'
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import Select from 'react-select';
import { ALL_AUTHORS } from './Queries'
import { UPDATE_BIRTHYEAR } from './Queries'

const Authors = (props) => {
  const [selected, setSelected] = useState({});
  const [setBornTo, setSetBornTo] = useState('');

  const [editAuthor] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const responseA = useQuery(ALL_AUTHORS)
  if (responseA.loading) return <div>loading...</div>

  if (!props.show) {
    return null
  }

  const authors = responseA.data.allAuthors

  const options = authors.map((a) => {
    const data = { value: a.name, label: a.name }
    return data
  })

  const submit = async (event) => {
    event.preventDefault()
    const name = selected.value;

    editAuthor({ variables: { name, setBornTo } })

    setSelected({})
    setSetBornTo('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token
        ? (
          <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
              <Select
                value={selected}
                onChange={setSelected}
                options={options}
              />
              <input
                value={setBornTo}
                onChange={({ target }) => setSetBornTo(Number(target.value))}
              />
              <button type="submit">update</button>
            </form>
          </div>)
        : ''}
    </div>
  )
}

export default Authors