import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone: '224' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const handleAddName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleAddNum = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.flatMap(e => e.name).includes(newName)){
      alert(`${newName} already exists in phonebook`)
      return(setNewName(''), setNewNum(''))
    }

    const person = { name : newName, phone : newNum }

    setPersons(persons.concat(person))
    setNewName('')
    setNewNum('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleAddName} />
        </div>
        <div>
          number: <input 
                    value={newNum}
                    onChange={handleAddNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(e => <li key={e.name}> {e.name} {e.phone} </li>)}
    </div>
  )
}

export default App