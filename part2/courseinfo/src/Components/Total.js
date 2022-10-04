import React from 'react'

const Total = ({exercises}) => {

  const total = exercises.reduce((x, item) => x + item, 0)

  return(
    <p>
      <b>Total of {total} exercises </b>
    </p>
  )
}

export default Total