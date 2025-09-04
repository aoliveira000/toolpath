"use client";
import { log } from "@repo/logger";
import type { Task } from "@repo/types";
import { useEffect, useState } from "react";

export default function TaskPage() {
    log({ message: "Task page loaded." });
    const [tasks, setTasks] = useState([]);

    function getTasks() {
        fetch("http://localhost:5001/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data));
    }

    function addTask(formData: FormData) {
        const task = formData.get("task");
        fetch("http://localhost:5001/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ value: task }),
        }).then(() => {
            getTasks();
        });
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="">
            <div>
                Saved Tasks
                <ul>
                    {tasks.map((task: Task, key: number) => (
                        <li key={key}>{task.value}</li>
                    ))}
                </ul>
            </div>
            <div>
                New Task
                <form action={addTask}>
                    <input type="text" name="task" />
                    <button type="submit">Add to Task List</button>
                </form>
            </div>
        </div>
    );
}
