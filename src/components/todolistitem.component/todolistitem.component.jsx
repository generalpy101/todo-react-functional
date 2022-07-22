import { useState, useEffect } from "react";
import "./todolistitem.styles.scss";
import { NotificationManager } from "react-notifications";

const TodoListItem = ({
    name,
    id,
    deleteTodo,
    isDated,
    endDateTime = new Date(),
}) => {
    const deadLine = new Date(endDateTime);
    const [isDone, setIsDone] = useState(false);
    const [deadlineExceeded, setDeadlineExceeded] = useState(false);

    const clearTimer = (timer) => {
        console.log("alarm cleared");
        clearTimeout(timer);
    };

    useEffect(() => {
        if (isDated && !isDone && !deadlineExceeded) {
            console.log("alarm set");
            const alarmTimer = setInterval(() => {
                const currDateTime = new Date();

                if (currDateTime >= deadLine) {
                    NotificationManager.error(
                        `Deadline for todo titled "${name.slice(
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
    }, [isDone, deadlineExceeded]);

    const onCheckedChange = () => {
        setIsDone(!isDone);
        NotificationManager.success(
            `Todo with title "${name.slice(0, 10)}" completed successfully!!`,
            "Todo completed successfully",
            3000
        );
    };

    return (
        <div className={`todo-list-item ${isDone ? "todo-item-finished" : ""}`}>
            <div className="todo-list-item-header">
                <input
                    type="checkbox"
                    name={name}
                    checked={isDone}
                    onChange={onCheckedChange}
                    disabled={isDone}
                />
                <h3 className={`todo-item-title`}>{name}</h3>
            </div>
            {isDated && !isDone ? (
                <div className="todo-list-item-end-date">
                    {!deadlineExceeded ? (
                        <p>Deadline : {deadLine.toLocaleString()}</p>
                    ) : (
                        <p>
                            Deadline of {deadLine.toLocaleString()} exceeded!!
                        </p>
                    )}
                </div>
            ) : isDone ? (
                <p>Yay!! You finished the task</p>
            ) : (
                <p>There is no deadline for this task!!</p>
            )}
            <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
                Delete
            </button>
        </div>
    );
};

export default TodoListItem;
