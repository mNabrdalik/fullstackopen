import PropTypes from 'prop-types'

const Filter = ({change, val}) => {

    return (
        <div>
            filter shown with: <input type="text" onChange={change} value={val} />
        </div>
    )
}

Filter.propTypes = {
    change: PropTypes.func.isRequired,
    val: PropTypes.string.isRequired,
}

export default Filter