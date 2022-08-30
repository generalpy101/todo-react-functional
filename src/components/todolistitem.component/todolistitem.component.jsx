import { useState, useEffect, useContext } from "react";
import "./todolistitem.styles.scss";
import { NotificationManager } from "react-notifications";

import { setTodoDone } from "../../utils/todosHandler";
import UserContext from "../../contexts/userContext";

const TodoListItem = ({
    title,
    id,
    deleteTodo,
    isDated,
    dateCreated,
    isDone,
    deadline = new Date(),
}) => {
    const deadLine = new Date(new Date(deadline).toISOString());
    const [todoIsDone, setTodoIsDone] = useState(isDone);
    const [deadlineExceeded, setDeadlineExceeded] = useState(false);
    const { userDetails } = useContext(UserContext);
    //console.log({ title, id, deleteTodo, isDated, dateCreated, isDone });
    const clearTimer = (timer) => {
        console.log("alarm cleared");
        clearTimeout(timer);
    };

    useEffect(() => {
        if (isDated && !todoIsDone && !deadlineExceeded) {
            console.log("alarm set");
            const alarmTimer = setInterval(() => {
                const currDateTime = new Date();

                if (currDateTime >= deadLine) {
                    NotificationManager.error(
                        `Deadline for todo titled "${title.slice(
                            0,
                            10
                        )}" exceeded`,
                        "Deadline exceeded",
                        3000
                    );
                    setDeadlineExceeded(true);
                    clearTimer(alarmTimer);
                }
            }, 1000);
            return () => clearTimer(alarmTimer);
        }
    }, [todoIsDone, deadlineExceeded]);

    const onCheckedChange = () => {
        setTodoDone(userDetails.userToken, id)
            .then((dat) => {
                if (dat["id"] !== id) {
                    NotificationManager.error(
                        `Error occured from serverside`,
                        "Error",
                        3000
                    );
                    return;
                }
                setTodoIsDone(!todoIsDone);
                NotificationManager.success(
                    `Todo with title "${title.slice(
                        0,
                        10
                    )}" completed successfully!!`,
                    "Todo completed successfully",
                    3000
                );
            })
            .catch((e) => {
                console.log(`Error occured : ${e}`);
            });
    };

    return (
        <div
            className={`todo-list-item ${
                todoIsDone ? "todo-item-finished" : ""
            }`}
        >
            <div className="todo-list-item-header">
                <input
                    type="checkbox"
                    name={title}
                    checked={todoIsDone}
                    onChange={onCheckedChange}
                    disabled={todoIsDone}
                />
                <h3 className={`todo-item-title`}>{title}</h3>
            </div>
            {isDated && !todoIsDone ? (
                <div className="todo-list-item-end-date">
                    {!deadlineExceeded ? (
                        <p>Deadline : {deadLine.toLocaleString()}</p>
                    ) : (
                        <p>
                            Deadline of {deadLine.toLocaleString()} exceeded!!
                        </p>
                    )}
                </div>
            ) : todoIsDone ? (
                <p>Yay!! You finished the task</p>
            ) : (
                <p>There is no deadline for this task!!</p>
            )}
            <div>
                <p>Created on : {new Date(dateCreated).toLocaleString()}</p>
            </div>
            <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
                Delete
            </button>
        </div>
    );
};

export default TodoListItem;
