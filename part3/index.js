require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
//const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.post('/api/persons', function (req, res, next) {
    const body = req.body
     
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    
    person
        .save()
        //.then(saved => saved.toJSON())
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
        
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new:true}).then(updated => {
        res.json(updated)
    })
    .catch(error => next(error))
})

app.get('/', function (req, res) {
    res.send(`<h3>Welcome, available pages:</h3>
    <p>/info</p>
    <p>/api/persons</p>
    <p>/api/persons/[insert id]<p/>`)
})

app.get('/api/persons', function (req, res) {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', function (req, res, next) {
    Person.findById(req.params.id).then(person => {
        if (person) 
            res.json(person)
        else
            res.status(404).end()
    })
    .catch(error => next(error))
})

app.get('/info', function (req, res) {
    const date = new Date()
    Person.find({}).then(result => {
        res.send(`<p>Phonebook has info for ${result.length} people</p>
        <p>${date}</p>`)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', function (req, res, next) {
    Person.findByIdAndRemove(req.params.id).then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } 
  
    next(error)
  }

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
