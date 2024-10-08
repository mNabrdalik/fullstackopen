
import PropTypes from 'prop-types'
import Header from "./Header"
import Content from "./Content"
import Sum from './Sum'

const Course = ({course}) => {

    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}></Content>
            <Sum parts={course.parts}></Sum>
        </div>

    )
}

Course.propTypes = {
    course: PropTypes.shape({
        name: PropTypes.string.isRequired,
        parts: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
          exercises: PropTypes.number.isRequired,
        })).isRequired
    }).isRequired,
}

export default Course