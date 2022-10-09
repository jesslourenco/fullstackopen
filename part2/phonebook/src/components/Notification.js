const Notification = ({ message }) => {

    if (message === null) return null

    const divStyle = {
            color: 'white',
            background: 'green',
            borderStyle: 'solid',
            borderRaduys: 5,
            padding: 10,
            marginBottom: 10,
            fontSize: 20
        }

    return (
        <div style={divStyle}>
            {message}
        </div>
    )
}

export default Notification