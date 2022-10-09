const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
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

  if (persons.find(p => p.name === body.name)){
    return response.status(409).json({ 
      error: 'name must be unique' 
    })
  }

  const generateId = () => {
    return Math.floor(Math.random() * 100000)
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})