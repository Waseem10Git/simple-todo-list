import { useState, useEffect, useRef } from "react"
import axios from "axios"

function Create ({onTaskAdded}) {
    const [task, setTask] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleAdd = () => {
        if (task.trim() === "") return;

        axios.post('http://localhost:4001/add', {task: task})
        .then(result => {
            setTask("");
            inputRef.current.focus();
            onTaskAdded();
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="create_form">
            <input type="text" ref={inputRef} placeholder="Enter Task" value={task} onChange={(e) => setTask(e.target.value)} />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create