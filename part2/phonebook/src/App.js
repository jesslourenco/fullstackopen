import { useState } from 'react'
import PersonForm from './components/PersonForm'
import People from './components/People'
import Filter from './components/Filter'

const App = () => {
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456'},
      { name: 'Ada Lovelace', number: '39-44-5323523'},
      { name: 'Dan Abramov', number: '12-43-234345'},
      { name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState()

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNum = (event) => {
    setNewNum(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.flatMap(e => e.name.toLowerCase()).includes(newName)){
      alert(`${newName} already exists in phonebook`)
      return(setNewName(''), setNewNum(''))
    }

    const person = { name : newName, number : newNum }

    setPersons(persons.concat(person))
    setNewName('')
    setNewNum('')
  }

  const handleSearch = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
   }

  const display = filter 
  ? persons.filter(person => 
                    person.name
                    .toLowerCase()
                    .includes(filter)) 
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
        <PersonForm addPerson={addPerson} 
                    newName={newName} 
                    handleAddName={handleAddName} 
                    newNum={newNum} 
                    handleAddNum={handleAddNum}
        />
        
      <h2>Find</h2>
        <Filter handleSearch={handleSearch}/>

      <h2>Numbers</h2>
        <People phonebook={display} />     
    </div>
  )
}
export default App
