import React from 'react'

const Filter = ({handleSearch}) => {
    return(
        <input onChange={handleSearch}/>
    )
}

export default Filter