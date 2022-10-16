require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req) => {
    return 'POST' === req.method ? JSON.stringify(req.body) : '' // special morgan token only for POST
  })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/info', (request, response) => {
  const info = {
    date: new Date(),
    numRecords: persons.length
  }
  response.send(
    `<div> Phonebook has info for ${info.numRecords} people
            <br>
            ${info.date}
        </div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)

  if (persons.find(p => p.id === id)) {

    persons = persons.filter(p => p.id !== id)
    response.status(204).end()

  } else {
    response.status(404).end()
  }
})


app.post('/api/persons', (request, response) => {

  const body = request.body 

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  
  const person = new Person({
      name: body.name,
      number: body.number
  })

  person.save()
  .then(person => {
    response.json(person)
  })
  .catch((err) => console.log(err))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})