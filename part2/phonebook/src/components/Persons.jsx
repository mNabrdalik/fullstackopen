import PropTypes from 'prop-types'

const Persons = ({persons, deleteData}) => {

    return (
        <ul>
            {persons.map(person => 
                <li key={person.id}>
                    <span >{person.name} {person.number} </span>
                    <button onClick={() => deleteData(person.name, person.id)}>delete</button>
                </li>)}
        </ul>
    )
}

Persons.propTypes = {
    persons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ).isRequired
}

export default Persons