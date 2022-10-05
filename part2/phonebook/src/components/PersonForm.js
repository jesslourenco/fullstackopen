import React from 'react'

const PersonForm = ({ addPerson, newName, newNum, handleAddName, handleAddNum} ) => {
    return(
        <form onSubmit={addPerson}>
          <div>
            name: <input 
                    value={newName}
                    onChange={handleAddName} />
          </div>
          <div>
            number: <input 
                      value={newNum}
                      onChange={handleAddNum} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
}

export default PersonForm