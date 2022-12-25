import React from 'react'
import Person from './Person'


const People = ({phonebook, handleDelete }) => {
  
  return(
    <>
      {phonebook.map( e => 
        <div key={e.name}> 
          <Person name={e.name} number={e.number} id={e.id} handleDelete={handleDelete}/>
        </div>
      )
      }
    </>
  )
}

export default People