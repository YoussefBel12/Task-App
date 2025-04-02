/*


import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://localhost:7209/api";

const TaskApi = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({ taskName: "", taskDescription: "" });
    const [editTaskId, setEditTaskId] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) fetchTasks();
        else navigate("/login"); // Redirect to login if not authenticated
    }, [token]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/AppTask`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/AppTask`, task, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTask({ taskName: "", taskDescription: "" });
            fetchTasks();
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/AppTask/${editTaskId}`, task, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditTaskId(null);
            setTask({ taskName: "", taskDescription: "" });
            fetchTasks();
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/AppTask/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const handleEdit = (task) => {
        setEditTaskId(task.appTaskID);
        setTask({ taskName: task.taskName, taskDescription: task.taskDescription });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    return (
        <div>
            <h2>Tasks</h2>
            <button onClick={handleLogout}>Logout</button>

           
            <form onSubmit={editTaskId ? handleUpdateTask : handleAddTask}>
                <input
                    type="text"
                    name="taskName"
                    placeholder="Task Name"
                    value={task.taskName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="taskDescription"
                    placeholder="Task Description"
                    value={task.taskDescription}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editTaskId ? "Update Task" : "Add Task"}</button>
            </form>

         
            <ul>
                {tasks.map((task) => (
                    <li key={task.appTaskID}>
                        <strong>{task.taskName}</strong>: {task.taskDescription}
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleDeleteTask(task.appTaskID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskApi;



keep the one above needed as a source code when stylezd component fail
*/

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box, List, ListItem, ListItemText, IconButton, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const API_URL = "https://localhost:7209/api";

const TaskApi = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({
        appTaskID: null,
        taskName: "",
        taskDescription: "",
        taskStartDate: "",
        taskEndDate: "",
        taskPriority: 0,
        taskStatus: false
    });
    const [editTaskId, setEditTaskId] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) fetchTasks();
        else navigate("/login"); // Redirect to login if not authenticated
    }, [token]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/AppTask`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask({ ...task, [name]: type === 'checkbox' ? checked : value });
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/AppTask`, {
                taskName: task.taskName,
                taskDescription: task.taskDescription,
                taskStartDate: task.taskStartDate,
                taskEndDate: task.taskEndDate,
                taskPriority: task.taskPriority,
                taskStatus: task.taskStatus
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTask({
                appTaskID: null,
                taskName: "",
                taskDescription: "",
                taskStartDate: "",
                taskEndDate: "",
                taskPriority: 0,
                taskStatus: false
            });
            fetchTasks();
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/AppTask/${editTaskId}`, task, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditTaskId(null);
            setTask({
                appTaskID: null,
                taskName: "",
                taskDescription: "",
                taskStartDate: "",
                taskEndDate: "",
                taskPriority: 0,
                taskStatus: false
            });
            fetchTasks();
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/AppTask/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const handleEdit = (task) => {
        setEditTaskId(task.appTaskID);
        setTask({
            appTaskID: task.appTaskID,
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            taskStartDate: task.taskStartDate.split('T')[0], // Format date to yyyy-MM-dd
            taskEndDate: task.taskEndDate.split('T')[0], // Format date to yyyy-MM-dd
            taskPriority: task.taskPriority,
            taskStatus: task.taskStatus
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Tasks
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2, mb: 2 }}>
                    Logout
                </Button>
                <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
                    <Box component="form" onSubmit={editTaskId ? handleUpdateTask : handleAddTask} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="taskName"
                            label="Task Name"
                            name="taskName"
                            value={task.taskName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="taskDescription"
                            label="Task Description"
                            name="taskDescription"
                            value={task.taskDescription}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="taskStartDate"
                            label="Task Start Date"
                            name="taskStartDate"
                            type="date"
                            value={task.taskStartDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="taskEndDate"
                            label="Task End Date"
                            name="taskEndDate"
                            type="date"
                            value={task.taskEndDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="taskPriority"
                            label="Task Priority"
                            name="taskPriority"
                            type="number"
                            value={task.taskPriority}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={task.taskStatus}
                                    onChange={handleChange}
                                    name="taskStatus"
                                    color="primary"
                                />
                            }
                            label="Task Status"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {editTaskId ? "Update Task" : "Add Task"}
                        </Button>
                    </Box>
                </Paper>
                <List sx={{ width: '100%', mt: 3 }}>
                    {tasks.map((task) => (
                        <ListItem key={task.appTaskID} secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(task)}>
                                    <Edit />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.appTaskID)}>
                                    <Delete />
                                </IconButton>
                            </>
                        }>
                            <ListItemText
                                primary={task.taskName}
                                secondary={`${task.taskDescription} (Priority: ${task.taskPriority}, Status: ${task.taskStatus ? 'Completed' : 'Pending'})`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default TaskApi;



