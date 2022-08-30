import { createContext } from "react";

const UserContext = createContext({
    userDetails : {
        isAuthenticated: false,
        userToken: "",
        username: "",
    },
    setUserDetails : () => null
});

export default UserContext;
