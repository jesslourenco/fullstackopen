import React from 'react'

const Search = ({handleSearch}) => {
    return(
        <input onChange={handleSearch}/>
    )
}

export default Search