import "./App.styles.scss";
import TodoList from "./components/todolist.component/todolist.component";

const App = () => {
    return (
        <div className="container">
            <div className="todo-list">
                <h1>ToDo List</h1>
                <TodoList />
            </div>
        </div>
    );
};

export default App;
