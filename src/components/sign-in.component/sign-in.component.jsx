import { useState, useContext } from "react";
import FormInput from "../form-input.component/form-input.component";
import Button from "../Button.component/button.component";
import { signIn } from "../../utils/authHandler";

import UserContext from "../../contexts/userContext";

const defaultState = {
    username: "",
    password: "",
};

const SignIn = ({}) => {
    const [inputState, setInputState] = useState(defaultState);
    const { setUserDetails } = useContext(UserContext);

    const handleChange = (e) => {
        const inputField = e.target.name;
        const value = e.target.value;
        setInputState({ ...inputState, [inputField]: value });
    };

    const resetFields = () => {
        setInputState(defaultState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        resetFields();
        signIn(inputState.username, inputState.password)
            .then((dat) => {
                setUserDetails({
                    isAuthenticated: true,
                    userToken: dat["key"],
                    username: inputState.username,
                });
                
            })
            .catch((e) => {
                console.log(`Error occured : 
{
    statusText : ${e.statusText},
    message : ${e.message},
    response.status : ${e.status}
}`);
            });
    };

    return (
        <div>
            <h2>Already have an account?</h2>
            <span>Login here</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    placeholder="Username"
                    label="Username"
                    name="username"
                    value={inputState.username}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={inputState.password}
                    label="Password"
                    onChange={handleChange}
                    required
                />
                <Button>Sign In</Button>
            </form>
            {/* {userDetails.isAuthenticated && <Navigate to="/todos" />} */}
        </div>
    );
};

export default SignIn;
