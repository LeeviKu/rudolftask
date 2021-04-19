import React, {useState} from 'react'
import axios from 'axios';

const tasksRequest = (token) => {
    return axios.get("http://localhost:8080/api/tasks", {
        headers: {'Authorization': `Bearer ${token}`}
    }).then(result => result.data)
}

const getTasks = async (setTasks, token) => {
    const email = await tasksRequest(token)
    setTasks(email)
}

export default function Todos(props) {
    const [tasks, setTasks] = useState()
    getTasks(setTasks, props.token)
    return <h1>{tasks}</h1>
}