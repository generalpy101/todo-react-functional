import { useState } from "react";
import Button from "../Button.component/button.component";
import FormInput from "../form-input.component/form-input.component";
import { signUp } from "../../utils/authHandler";

const defaultState = {
    username: "",
    password1: "",
    password2: "",
};

const SignIn = ({}) => {
    const [inputState, setInputState] = useState(defaultState);

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
        if (inputState.password1 !== inputState.password2) {
            alert("Passwords don't match");
            return;
        }
        resetFields();
        signUp(inputState.username, inputState.password1);
    };

    return (
        <div>
            <h2>Don't have an acoount?</h2>
            <span>Register here</span>
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
                    name="password1"
                    value={inputState.password1}
                    label="Password"
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={inputState.password2}
                    label="Confirm Password"
                    onChange={handleChange}
                    required
                />
                <Button>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignIn;
