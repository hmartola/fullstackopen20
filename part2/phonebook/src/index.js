import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Names from './components/Names'
import Filter from './components/Filter'
import PersonDisplay from './components/PersonDisplay'
import AddBtn from './components/AddBtn'
import personService from './services/persons'
import Message from './components/Message'
import ErrorMsg from './components/ErrorMsg'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ message, setMessage] = useState(null)
  const [ errMessage, setErrMessage] = useState(null)

  /*{ name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }*/ 

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(el => el.name === newName))
        var conf = window.confirm(`${newName} is already added to the phonebook, replace existing phone number?`)
        if (conf === true) {
          const repl = persons.find(ex => ex.name === newName)
          personService
            .update(repl.id, nameObject)
            .then(updated => {
              setMessage(`Succesfully replaced ${nameObject.name} phone number`)
              setTimeout(() => {
                setMessage(null)
              }, 3000)
            setNewName("")
            setNewNumber("")
            })
            .catch(error => {
              setErrMessage(`Error, ${nameObject.name} already deleted from the phonebook`)
              setTimeout(() => {
                setErrMessage(null)
              }, 3000)
            })
          //window.location.reload(true);
        }
    else {
        personService
          .create(nameObject)
          .then(returned => {
            setPersons(persons.concat(returned))
            setNewName("")
            setNewNumber("")
            setMessage(`Succesfully added ${nameObject.name} to the phonebook`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
        console.log("added", event.target) 
      }
    }

  const deleteName = (id) => {
    const conf = window.confirm(`Delete ${id.name} ?`)
    if (conf === true){
      personService
        .remove(id.id)
        .then(deleted => {
          setMessage(`Succesfully deleted ${id.name} from the phonebook`)
          setTimeout(() => {
            setMessage(null)
            }, 3000)
          })
        .catch(error => {
          setErrMessage(`Error, ${id.name} already deleted from the phonebook`)
          setTimeout(() => {
            setErrMessage(null)
          }, 3000)
        })
      //window.location.reload(true);
    }
  }

  const handleNameEdit = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberEdit = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterEdit = (event) => {
    setFilter(event.target.value)
  }

  const filterPersons = (array, search) => {
    return array.filter(e => e.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
  }

  const hook = () => {
    console.log("effect")
  personService
    .getAll()
    .then(initial => {
      console.log("promise fulfilled")
      setPersons(initial)
    })
  }

  useEffect(hook, [])

  return (
    <div>
      
      <Message message = {message}/>
      <ErrorMsg message = {errMessage}/>

      <h1>Phonebook</h1>
      
      <Filter filter={filter} onChange={handleFilterEdit}></Filter>
      
      <div> <h2>Add name and number</h2> </div>
      
      <PersonDisplay newName={newName} handleNameEdit={handleNameEdit} 
        newNumber={newNumber} handleNumberEdit={handleNumberEdit}></PersonDisplay>
      
      <AddBtn addName={addName}></AddBtn>
      
      <h2>Numbers</h2>
      
        {filterPersons(persons, filter).map((names) =>
        <Names key={names.name} names={names} delName={() => deleteName(names)}/>)}
          
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


