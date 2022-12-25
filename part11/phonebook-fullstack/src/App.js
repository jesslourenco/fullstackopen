import React from 'react'
import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import People from './components/People'
import Filter from './components/Filter'
import phonebook from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState()
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phonebook
      .getAll()
      .then(response => {
        setPersons(response)
      })
    
  }, [])

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNum = (event) => {
    setNewNum(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(e => e.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`Replace phone number for ${newName}?`)) {
        const person = persons.find(e => e.name === newName)
        const updated = { ...person, number: newNum }

        phonebook
          .update(person.id, updated)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response))
            setMessage([`${person.name} has been updated!`, 'success'])
            setNewName('')
            setNewNum('')
          })
          .catch(error => {
            setMessage([`${error.response.data.error}`, 'error'])
            setNewName('')
            setNewNum('')
          })
      }
    } else {

      const person = { name: newName, number: newNum }

      phonebook
        .create(person)
        .then(response => {
          setPersons(persons.concat(response))
          setMessage([`${person.name} has been added to phonebook!`, 'success'])
          setNewName('')
          setNewNum('')
        })
        .catch(error => {
          setMessage([`${error.response.data.error}`, 'error'])
          console.log(error.response.data.error)
          setNewName('')
          setNewNum('')
        })
    }
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

  const handleDelete = (event, id, name) => {
    event.preventDefault()
    if (window.confirm(`delete ${name}?`))
      phonebook
        .destroy(id)
        .then(response => {
          setPersons(response)
        })
  }

  return (
    <div>
      <Notification message={message} setMessage={setMessage}/>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson}
        newName={newName}
        handleAddName={handleAddName}
        newNum={newNum}
        handleAddNum={handleAddNum}
      />

      <h2>Find</h2>
      <Filter handleSearch={handleSearch} />

      <h2>Numbers</h2>
      <People phonebook={display} handleDelete={handleDelete} />
    </div>
  )
}
export default App
