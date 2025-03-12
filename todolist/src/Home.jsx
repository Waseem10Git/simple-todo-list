import { useEffect, useState } from "react"
import Create from "./Create"
import axios from "axios"
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs"

function Home () {
    const [todos, setTodos] = useState([])

    const fetchTodos = () => {
        axios.get('http://localhost:4001/')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const handleCheck = (id) => {
        axios.put('http://localhost:4001/update/' + id)
        .then(fetchTodos)
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:4001/delete/' + id)
        .then(fetchTodos)
        .catch(err => console.log(err))
    }

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create onTaskAdded={fetchTodos} />
            {
                todos.length === 0 ? (
                    <div>
                        <h2>No Todos</h2>
                    </div>
                ) :
                todos.map(todo => (
                    <div className="task" key={todo._id}>
                        <div className="checkbox" onClick={() => handleCheck(todo._id)}>
                            {todo.done ? 
                            <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                            :
                            <BsCircleFill className="icon" />
                            }
                            <p className={todo.done ? "done" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)}/></span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home