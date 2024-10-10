import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearchValue(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    console.log(persons)
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName("")
      setNewNumber("")
    }
  }

  const searchValueToValue = searchValue.toLowerCase()
  const contactsToShow = searchValue === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchValueToValue))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter change={handleFilterChange} val={searchValue}/>
      
      <h3>Add new</h3>
      <PersonForm onSubmitForm={addContact} nameChange={handleNameChange} numberChange={handleNumberChange} nameVal={newName} numberVal={newNumber}/>

      <h3>Numbers</h3>
      <Persons persons={contactsToShow} />

    </div>
  )
}

export default App