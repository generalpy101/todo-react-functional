import "./App.styles.scss";
import TodoList from "./components/todolist.component/todolist.component";
import Authentication from "./components/routes/authentication.component/authentication.component";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/routes/navbar.component/navbar.component";

import { getUserDetails } from "./utils/authHandler";

import UserContext from "./contexts/userContext";

const UserDefaults = {
    isAuthenticated: false,
    userToken: null,
    userName: null,
};

const App = () => {
    const [userDetails, setUserDetails] = useState(UserDefaults);
    useEffect(() => {
        const token = localStorage.getItem("user");
        console.log(token);
        if (token && token !== "undefined" && !userDetails.isAuthenticated) {
            getUserDetails(token)
                .then((data) => {
                    console.log(data);
                    if (!data || !data["username"]) {
                        return;
                    }
                    const userName = data["username"];
                    setUserDetails({
                        isAuthenticated: true,
                        userToken: token,
                        userName,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route exact path="/auth" element={<Authentication />} />
                    {/* <Router exact path="/logout" element=} /> */}
                    {userDetails.isAuthenticated && (
                        <Route exact path="/todos" element={<TodoList />} />
                    )}
                </Routes>
            </div>
        </UserContext.Provider>
    );
};

export default App;
