import { useState } from "react";
import "./todolistitem.styles.scss"

const TodoListItem = ({name,id,deleteTodo}) => {
    const [isDone,setIsDone] = useState(false)

    const onCheckedChange = () => {
        setIsDone(!isDone);
    }

    return (
        <div className="todo-list-item">
            <input type="checkbox" name={name}  checked={isDone} onChange={onCheckedChange} />
            <h3 className={`todo-item-title ${isDone ? "todo-item-finished" : ""}`}>{name}</h3>
            <button className="btn btn-danger" onClick={() => deleteTodo(id)}>Delete</button>
        </div>
    )
}

export default TodoListItem;