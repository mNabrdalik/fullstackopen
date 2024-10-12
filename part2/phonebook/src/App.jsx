import { useState, useEffect } from 'react'

import './app.css'

import contactService from './services/contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [notification, setNotification] = useState({
    content: "",
    type: "success"
  })

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
            setNotification({
              type: "success",
              content: `${response.data.name} phone number was changed`
            })
            setPersons(persons.map(person => person.id !== response.data.id ? person : response.data));
          })
          .catch(error => {
            setNotification({
              type: "error",
              content: `${findedPerson.name} has already been removed from server`
            })
            setPersons(persons.filter(person => person.id !== findedPerson.id))
            console.error('Failed to update contact:', error);
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
          setNotification(prevNotification => ({
            ...prevNotification,
            content: `${response.data.name} was added to contacts`
          }))
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
      .then(response => {
        setNotification(prevNotification => ({
          ...prevNotification,
          content: `${response.data.name} was successful deleted from contacts`
        }))
        setPersons(persons.filter(person => person.id !== response.data.id))  // update local state
      })
      .catch(error => {
        setNotification({
          type: "error",
          content: `${name} has already been removed from server`
        })
        setPersons(persons.filter(person => person.id !== id))
        console.error('Failed to delete contact', error);
      })
    }

  }

  const searchValueToValue = searchValue.toLowerCase()
  const contactsToShow = searchValue === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchValueToValue))

  return (
    <div>
      <Notification message={notification.content} type={notification.type}></Notification>
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