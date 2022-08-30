import "./todolist-form.styles.scss";
import { useState } from "react";

import UserContext from "../../contexts/userContext";

const TodoListForm = ({ addTodoItem }) => {
    const getCurrentDateTime = () => {
        const currDate = new Date();
        currDate.setMinutes(
            currDate.getMinutes() - currDate.getTimezoneOffset()
        );
        return currDate.toISOString().slice(0, -1);
    };

    const [isDated, setIsDated] = useState(false);
    const [todoTextString, setTodoTextString] = useState("");
    const [todoDate, setTodoDate] = useState(getCurrentDateTime());
    const [internalTodoDate, setInternalTodoDate] = useState(
        getCurrentDateTime()
    );

    const handleFormSubmit = () => {
        if (todoTextString === "") return;
        const todoTitle = todoTextString;
        setTodoTextString("");
        const todoItem = { title: todoTitle, isDated };
        console.log(isDated);
        if (isDated) {
            const todoEndDate = internalTodoDate;
            setTodoDate(getCurrentDateTime());
            todoItem["deadline"] = todoEndDate;
        }
        addTodoItem(todoItem);
    };

    return (
        <div className="todo-list-form">
            <div className="todo-list-form-inputs">
                <div className="todo-list-form-input todo-list-form-dating">
                    <div className="todo-title-input">
                        <label
                            htmlFor="todo-title-input"
                            className="todo-title-input-label"
                        >
                            Select title for todo
                        </label>
                        <br />
                        <input
                            type="text"
                            value={todoTextString}
                            onChange={(e) => setTodoTextString(e.target.value)}
                            id="todo-title-input"
                        />
                    </div>
                    <div className="todo-list-form-input todo-reminder-input">
                        <label htmlFor="todo-isdated-input">
                            Do you want to set reminder ? :{" "}
                        </label>
                        <input
                            type="checkbox"
                            name="isDated"
                            id="todo-isdated-input"
                            className="todo-list-isdated"
                            value={isDated}
                            onChange={(e) => setIsDated(!isDated)}
                        />
                    </div>
                    <div className="todo-list-form-input todo-datepicker-input">
                        <label
                            htmlFor="date-picker"
                            className="datepicker-label"
                        >
                            Choose deadline{" "}
                        </label>
                        <br />
                        <input
                            type="datetime-local"
                            min={new Date().toISOString().slice(0, -1)}
                            className="todo-list-form-datepicker"
                            disabled={!isDated}
                            id="date-picker"
                            onChange={(e) => {
                                const assignableDate = new Date(
                                    e.target.valueAsNumber
                                )
                                    .toISOString()
                                    .slice(0, -1);
                                setTodoDate(assignableDate);
                                setInternalTodoDate(
                                    new Date(
                                        e.target.valueAsNumber
                                    ).toISOString()
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
            <button className="btn btn-success" onClick={handleFormSubmit}>
                Add Todo
            </button>
        </div>
    );
};

export default TodoListForm;
