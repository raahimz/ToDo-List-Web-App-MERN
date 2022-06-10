import React, { useState, useEffect } from "react";
import InputArea from "./InputArea";
import Header from "./Header";
import Divider from "./Divider";
import Task from "./Task";
import axios from "axios";

const serverResponseDelay = 100; //time(ms) after which frontend will contact backend for GET request

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => (getTasks()), []); //this triggers getTasks() when the app loads

    function getTasks() {
        axios.get('http://localhost:3000/tasks')
            .then(res => {setTasks(res.data);});
    }

    function addTask(text) {
        const options = {
            url: 'http://localhost:3000/tasks/add',
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                text: text,
            }
        };

        axios(options)
            .catch(err => {console.log(err)});
        
        setTimeout(() => getTasks(), serverResponseDelay);
    }

    function deleteTask(id) {
        const options = {
            url: 'http://localhost:3000/tasks/delete/' + id,
            method: 'DELETE',
        };

        axios(options)
            .catch(err => {console.log(err)});

        setTimeout(() => getTasks(), serverResponseDelay);
    }

    function completeTask(id) {
        const options = {
            url: 'http://localhost:3000/tasks/complete/' + id,
            method: 'GET',
        };

        axios(options)
            .catch(err => {console.log(err)});

        setTimeout(() => getTasks(), serverResponseDelay);
    }


    return (
        <div>
            <div className="container">
                <div style={{height: '50px'}}></div>
                <Header />
                <div style={{height: '20px'}}></div>
                <InputArea addTask={addTask} />
                <div style={{height: '50px'}}></div>
                <Divider text="TASKS" />
                <div style={{height: '35px'}}></div>
 
                {tasks.map((task, index) => {
                    if (!task.completed) {
                        return <div key={index}>
                            <Task completed={task.completed} completeTask={completeTask} deleteTask={deleteTask} id={task._id} text={task.text} />
                            <div style={{height: '10px'}}></div>
                        </div>
                    }
                    })
                }
                <div style={{height: '25px'}}></div>
                <Divider text="COMPLETED" />
                <div style={{height: '35px'}}></div>
                {tasks.map((task, index) => {
                    if (task.completed) {
                        return <div key={index}>
                            <Task completed={task.completed} completeTask={completeTask} deleteTask={deleteTask} id={task._id} text={task.text} />
                            <div style={{height: '10px'}}></div>
                        </div>
                    }
                    })
                } 
            </div>
        </div>
    );
}

export default App;