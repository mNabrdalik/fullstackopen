import { useState, useEffect } from 'react'

import contactService from './services/contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const dataUrl = 'http://localhost:3001/persons';
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    contactService
      .getAll()
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

    if(persons.find(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const findedPerson = persons.find(person => person.name === newName)
        const updatedPersonData = {...findedPerson, number: newNumber}

        contactService
          .updateOne(findedPerson.id, updatedPersonData)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.data.id ? person : response.data));
          })
      }
    } else {
      const newContact = {
        name: newName,
        number: newNumber
      }

      contactService
        .create(newContact)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
        })
        .catch(error => {
          console.error('Error adding contact:', error);
        })
    }

  }

  const deleteContact = (name, id) => {
    if(window.confirm(`Delete ${name}?`)) {
      contactService
      .deleteOne(id)
      .then(response => 
        setPersons(persons.filter(person => person.id !== response.data.id))  // update local state
      )
      .catch(error => {
        console.error('Failed to delete contact', error);
      })
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
      <Persons persons={contactsToShow} deleteData={deleteContact}/>

    </div>
  )
}

export default App