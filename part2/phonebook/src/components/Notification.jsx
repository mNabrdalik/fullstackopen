// eslint-disable-next-line react/prop-types
const Notification = ({message, type}) => {

    const notificationStyle = {
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
        fontWeight: 500
    }

    if(message === "") {
        return null
    }

    return (
        <div className={`notification ${type === "error" ? "notification-error" : "notification-success"}`} style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification