import PropTypes from 'prop-types'

const Persons = ({persons}) => {

    return (
        <div>
            {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
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