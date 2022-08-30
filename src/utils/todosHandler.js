import env from "react-dotenv";

const URL = env.API_URL;

export async function getTodoList(userToken) {
    const res = await fetch(`${URL}/todos`, {
        headers: {
            Authorization: `Token ${userToken}`,
        },
    });
    return await res.json();
}

export async function setTodoDone(userToken, todoId) {
    try {
        const res = await fetch(`${URL}/todos/${todoId}`, {
            headers: {
                Authorization: `Token ${userToken}`,
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({
                isDone: true,
            }),
        });
        return await res.json();
    } catch (e) {
        console.log(e);
        return Promise.resolve();
    }
}

export async function delteTodoAPI(userToken, todoId) {
    try {
        const res = await fetch(`${URL}/todos/${todoId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${userToken}`,
            },
        });
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function createTodoAPI({ userToken, ...todoDetails }) {
    try {
        const todo = {
            title: todoDetails.title,
            isDated: todoDetails.isDated,
            deadline: todoDetails.deadline,
            isDone: false,
        };
        return fetch(`${URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${userToken}`,
            },
            body: JSON.stringify(todo),
        });
    } catch (e) {
        return Promise.reject(e);
    }
}
