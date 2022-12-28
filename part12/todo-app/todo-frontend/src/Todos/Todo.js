import {useParams} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from '../util/apiClient'

const Todo = () => {
    const [todo, setTodo] = useState([])
    const {id} = useParams()
    
    useEffect(() => {
        const getTodo = async() => {
            const { data } = await axios.get(`/todos/${id}`)
            setTodo(data);
        }
        getTodo()
      }, [id])

    return(
        <div>
            Task: {todo.text} <br/>
            Status: {todo.done? 'done' : 'not done'} <br/>
            Id: {todo._id} <br/>
        </div>
    )
}

export default Todo