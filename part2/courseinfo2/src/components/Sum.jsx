import PropTypes from 'prop-types'

const Sum = ({parts}) => {

    const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

    return <strong>total of {sum} exercises</strong>
}

Sum.propTypes = {
    parts: PropTypes.arrayOf(
        PropTypes.shape({
            exercises: PropTypes.number.isRequired
        })
    ).isRequired
}

export default Sum