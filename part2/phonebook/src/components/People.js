import React from 'react'
import Person from './Person'

const People = ({phonebook}) => {
    return(
    <>
      {phonebook.map( e => 
        <div key={e.name}> 
          <Person name={e.name} number={e.number} />
        </div>)
      }
    </>
    )
}

export default People