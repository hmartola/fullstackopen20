const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id: 2
    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3
    },
    {
        name: 'Mary Poppin',
        number: '39-23-6423122',
        id: 4
    }
]

const generateID = () => {
    min = Math.ceil(1)
    max = Math.floor(100)
    const rndID = Math.floor(Math.random()*(max-min)) + min
    return rndID
}

app.post('/api/persons', function (req, res) {
    const body = req.body
    if (!body.name || !body.number) 
        return res.status(400).json({error: 'name or number missing'})
     
    const person = {
        name: body.name,
        number: body.number,
        id: generateID()
    }
    if (persons.some(p => p.name === body.name))
        return res.status(400).json({error: 'name already exists'})
    else    
        persons = persons.concat(person)
        res.json(person)
})

app.get('/', function (req, res) {
    res.send(`<p>${generateID()}</p>`)
})

app.get('/api/persons', function (req, res) {
    res.json(persons)
})

app.get('/api/persons/:id', function (req, res) {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person)
        res.json(person)
    else
        res.status(404).end()

})

app.get('/info', function (req, res) {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`)
})

app.delete('/api/persons/:id', function (req, res) {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})