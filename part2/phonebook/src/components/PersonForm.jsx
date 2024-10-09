import PropTypes from 'prop-types'

const PersonForm = ({onSubmitForm, nameChange, numberChange, nameVal, numberVal}) => {

    return (
        <form onSubmit={onSubmitForm}>
            <div>
            name: <input onChange={nameChange} value={nameVal}/>
            </div>
            <div>
            phone number: <input onChange={numberChange} value={numberVal}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

PersonForm.propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    nameChange: PropTypes.func.isRequired,
    nameVal: PropTypes.string.isRequired,
    numberChange: PropTypes.func.isRequired,
    numberVal: PropTypes.string.isRequired,
}

export default PersonForm