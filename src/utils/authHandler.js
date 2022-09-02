import env from "react-dotenv";

const AUTH_BASE_URL = env.AUTH_BASE_URL || process.env.AUTH_BASE_URL;

export function signIn(username, password) {
    if (!username || !password) {
        console.error("Error, no username or password provided");
        return;
    }
    return fetch(`${AUTH_BASE_URL}/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
        .then((res) => {
            if (!res.ok) {
                let err = new Error(`${res.status}`);
                err.response = res;
                err.status = res.status;
                err.statusText = res.statusText;
                throw err;
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem("user", data["key"]);
            return data;
        });
}

export function signUp(username, password) {
    if (!username || !password) {
        console.error("Error, no username or password provided");
        return;
    }
    return fetch(`${AUTH_BASE_URL}/registration`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password1: password,
            password2: password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            //sessionStorage.setItem("key", data[key]);
        });
}

export function getUserDetails(userToken) {
    return fetch(`${AUTH_BASE_URL}/user`, {
        headers: {
            Authorization: `Token ${userToken}`,
        },
    })
        .then((res) => res.json())
        .catch((err) => {
            return {};
        });
}

export function signOut(userToken) {
    return fetch(`${AUTH_BASE_URL}/logout/`, {
        method : "POST",
        headers: {
            Authorization: `Token ${userToken}`,
        },
    }).then(res => {
        if (res.status > 400 && res.status < 600) {
            Promise.reject(`Error ${res.status} : ${res.statusText}`)
        }
    })
}
