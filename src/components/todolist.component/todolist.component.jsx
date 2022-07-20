import { useState, useEffect } from "react";
import "./todolist.styles.scss";
import TodoListItem from "../todolistitem.component/todolistitem.component";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [todoTextString, setTodoTextString] = useState("");
    const [todoId, setTodoId] = useState(0);

    const changeTodoString = (e) => {
        const val = e.target.value;
        setTodoTextString(val);
    };

    const addTodoItem = () => {
        if (todoTextString === "") return;
        const todoTitle = todoTextString;
        setTodoTextString("");
        const newTodo = {
            id: todoId,
            name: todoTitle,
        };
        setTodos([...todos, newTodo]);
        const x = todoId + 1;
        setTodoId(x);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="todo-items-container">
            <div className="todo-list-form">
                <input
                    type="text"
                    value={todoTextString}
                    onChange={changeTodoString}
                />
                <button className="btn btn-success" onClick={addTodoItem}>
                    +
                </button>
            </div>
            {todos.length !== 0 ? todos.map((todo) => {
                return (
                    <TodoListItem
                        name={todo.name}
                        key={todo.id}
                        id={todo.id}
                        deleteTodo={deleteTodo}
                    />
                );
            }) : (<>
                <h2 className="todo-list-empty">Todo list is empty</h2>
            </>)}
        </div>
    );
};

export default TodoList;
