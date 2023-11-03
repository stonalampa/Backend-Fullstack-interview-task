import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { Task, createTask, getTasks } from "../services/TaskService";
import { getIdFromToken } from "../helpers/tokenHelper";
import { logout } from "../services/AuthService";
import "./Tasks.css";

export default function Tasks() {
    const { data: serverData } = useQuery("tasks", getTasks);

    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Array<Task>>([]);
    useEffect(() => {
        if (serverData) {
            setTasks(serverData);
        }
    }, [serverData]);

    const handleAddTask = async () => {
        const response = await createTask({
            title: "Test title",
            description: "Test test test",
            priority: "LOW",
            status: "IN_PROGRESS",
            ownerId: getIdFromToken() ?? -1,
        });

        console.log(response);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <div className="task-manager-container">
                <div className="top-menu">
                    <Button onClick={handleAddTask}>Add Task</Button>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </div>
            <div className="task-list">
                {tasks.map((task: any) => (
                    <div key={task.id} className="task-thumbnail">
                        <h3 style={{ color: "black" }}>{task.title}</h3>
                        <p style={{ color: "black" }}>{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
