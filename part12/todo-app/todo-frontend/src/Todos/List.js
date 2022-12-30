import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map(todo => 
      <div key={todo._id}>
        <Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />
        </div>
      ).reduce((acc, cur) => [...acc, <hr key={Math.floor(Math.random() * 100)} />, cur], [])}
    </>
  )
}

export default TodoList
