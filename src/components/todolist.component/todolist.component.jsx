import { useState } from "react";
import "./todolist.styles.scss";
import TodoListItem from "../todolistitem.component/todolistitem.component";
import TodoListForm from "../todolist-form.component/todolist-form.component";

import { NotificationManager } from "react-notifications";

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const [todoId, setTodoId] = useState(0);

    const addTodoItem = (todoItem) => {
        todoItem["id"] = todoId;
        setTodos([...todos, todoItem]);
        NotificationManager.success(
            `Todo with title "${todoItem.name.slice(0, 10)}" created`,
            "Todo Created",
            3000
        );
        const x = todoId + 1;
        setTodoId(x);
    };

    const deleteTodo = (id) => {
        NotificationManager.warning(
            `Todo with title "${todos
                .filter((todo) => todo.id === id)[0]
                .name.slice(0, 10)}" deleted`,
            "Todo item deleted",
            3000
        );
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const formProps = {
        addTodoItem,
    };

    return (
        <div className="todo-items-container">
            <TodoListForm {...formProps} />
            {todos.length !== 0 ? (
                todos.map((todo) => {
                    return (
                        <TodoListItem
                            key={todo.id}
                            {...todo}
                            deleteTodo={deleteTodo}
                        />
                    );
                })
            ) : (
                <>
                    <h2 className="todo-list-empty">Todo list is empty</h2>
                </>
            )}
        </div>
    );
};

export default TodoList;
