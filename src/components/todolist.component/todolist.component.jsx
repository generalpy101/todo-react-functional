import { useEffect, useState, useContext } from "react";
import "./todolist.styles.scss";
import TodoListItem from "../todolistitem.component/todolistitem.component";
import TodoListForm from "../todolist-form.component/todolist-form.component";

import { createTodoAPI } from "../../utils/todosHandler";

import UserContext from "../../contexts/userContext";

import { getTodoList, delteTodoAPI } from "../../utils/todosHandler";

import { NotificationManager } from "react-notifications";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [todoId, setTodoId] = useState(0);

    const { userDetails } = useContext(UserContext);

    useEffect(() => {
        if (isLoading && userDetails.isAuthenticated) {
            getTodoList(userDetails.userToken).then((data) => {
                setTodos(data);
                //console.log(data);
                setIsLoading(false);
            });
        }
    });

    const addTodoItem = async (todoItem) => {
        try {
            const resp = await createTodoAPI({
                userToken: userDetails.userToken,
                ...todoItem,
            });
            setTodos([...todos, todoItem]);
            NotificationManager.success(
                `Todo with title "${todoItem.name.slice(0, 10)}" created`,
                "Todo Created",
                3000
            );
        } catch (e) {
            console.log(`Error : ${e}`);
        }
    };

    const deleteTodo = (id) => {
        delteTodoAPI(userDetails.userToken, id)
            .then((res) => {
                console.log(res.status);
                if (res.status >= 200 && res.status < 300) {
                    console.log(res.status);
                    NotificationManager.warning(
                        `Todo successfully deleted`,
                        "Todo item deleted",
                        3000
                    );
                    setTodos(todos.filter((todo) => todo.id !== id));
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const formProps = {
        addTodoItem,
    };

    return (
        <div className="todo-items-container">
            <TodoListForm {...formProps} />
            {todos.length !== 0 ? (
                todos.map((todo) => {
                    // console.log(todo);
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
