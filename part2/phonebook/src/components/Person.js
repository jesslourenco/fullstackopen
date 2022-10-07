import React from 'react'
import axios from 'axios'
import People from './People'

const Person = ({name, number, id, handleDelete}) => {
    return(
    <div> {name} {number} 
        <button onClick={event => handleDelete(event, id, name)} >delete</button>
    </div>
    )
}

export default Person