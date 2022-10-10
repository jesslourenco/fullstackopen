const Notification = ({ message, setMessage }) => {

    if (message === null) return null

    let divStyle

    if (message[1] === 'success'){
         divStyle = {
            color: 'white',
            background: 'green',
            borderStyle: 'solid',
            borderRaduys: 5,
            padding: 10,
            marginBottom: 10,
            fontSize: 20
        }
    } else {
        divStyle = {
            color: 'white',
            background: 'red',
            borderStyle: 'solid',
            borderRaduys: 5,
            padding: 10,
            marginBottom: 10,
            fontSize: 20
        }
    }
    setTimeout(() => {
        setMessage(null)
      }, 3000)

    return (
        <div style={divStyle}>
            {message[0]}
        </div>
    )
}

export default Notification