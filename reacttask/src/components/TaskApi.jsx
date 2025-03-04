/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'; // Adjust the path as needed

const TaskApi = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        taskName: '',
        taskDescription: '',
        taskStartDate: '',
        taskEndDate: '',
        taskPriority: 1,
        taskStatus: false,
    });
    const [updateTask, setUpdateTask] = useState({
        appTaskID: '',
        taskName: '',
        taskDescription: '',
        taskStartDate: '',
        taskEndDate: '',
        taskPriority: 1,
        taskStatus: false,
    });

    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${config.backendUrl}/api/AppTask`);
            setTasks(response.data);
            console.log('Tasks fetched:', response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Fetch a single task by ID
    const fetchTaskById = async (id) => {
        try {
            const response = await axios.get(`${config.backendUrl}/api/AppTask/${id}`);
            console.log('Task fetched by ID:', response.data);
        } catch (error) {
            console.error('Error fetching task by ID:', error);
        }
    };

    // Create a new task
    const createTask = async () => {
        try {
            const response = await axios.post(`${config.backendUrl}/api/AppTask`, newTask);
            console.log('Task created:', response.data);
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    // Update an existing task
    const updateExistingTask = async () => {
        try {
            const response = await axios.put(`${config.backendUrl}/api/AppTask/${updateTask.appTaskID}`, updateTask);
            console.log('Task updated:', response.data);
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Delete a task by ID
    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`${config.backendUrl}/api/AppTask/${id}`);
            console.log('Task deleted:', response.data);
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Fetch all tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Task API Test</h1>

           
            <div>
                <h2>All Tasks</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.appTaskID}>
                            <strong>{task.taskName}</strong> - {task.taskDescription}
                            <br />
                            Start: {new Date(task.taskStartDate).toLocaleDateString()} - End: {new Date(task.taskEndDate).toLocaleDateString()}
                            <br />
                            Priority: {task.taskPriority} - Status: {task.taskStatus ? 'Completed' : 'Pending'}
                            <button onClick={() => fetchTaskById(task.appTaskID)}>View Details</button>
                            <button onClick={() => deleteTask(task.appTaskID)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            
            <div>
                <h2>Create New Task</h2>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={newTask.taskName}
                    onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTask.taskDescription}
                    onChange={(e) => setNewTask({ ...newTask, taskDescription: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    value={newTask.taskStartDate}
                    onChange={(e) => setNewTask({ ...newTask, taskStartDate: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={newTask.taskEndDate}
                    onChange={(e) => setNewTask({ ...newTask, taskEndDate: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Priority"
                    value={newTask.taskPriority}
                    onChange={(e) => setNewTask({ ...newTask, taskPriority: e.target.value })}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={newTask.taskStatus}
                        onChange={(e) => setNewTask({ ...newTask, taskStatus: e.target.checked })}
                    />
                    Completed
                </label>
                <button onClick={createTask}>Create Task</button>
            </div>

            
            <div>
                <h2>Update Task</h2>
                <input
                    type="number"
                    placeholder="Task ID"
                    value={updateTask.appTaskID}
                    onChange={(e) => setUpdateTask({ ...updateTask, appTaskID: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Task Name"
                    value={updateTask.taskName}
                    onChange={(e) => setUpdateTask({ ...updateTask, taskName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={updateTask.taskDescription}
                    onChange={(e) => setUpdateTask({ ...updateTask, taskDescription: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    value={updateTask.taskStartDate}
                    onChange={(e) => setUpdateTask({ ...updateTask, taskStartDate: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={updateTask.taskEndDate}
                    onChange={(e) => setUpdateTask({ ...updateTask, taskEndDate: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Priority"
                    value={updateTask.taskPriority}
                    onChange={(e) => setUpdateTask({ ...updateTask, taskPriority: e.target.value })}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={updateTask.taskStatus}
                        onChange={(e) => setUpdateTask({ ...updateTask, taskStatus: e.target.checked })}
                    />
                    Completed
                </label>
                <button onClick={updateExistingTask}>Update Task</button>
            </div>
        </div>
    );
};

export default TaskApi;
*/



// up is the normal old design bellow is the ANDT UI installed also lowered REACT v.

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Table, Button, Input, DatePicker, Select, Checkbox, Form, Modal, Card } from 'antd';
import moment from 'moment'; // Import moment

const { Option } = Select;
const { TextArea } = Input;

const TaskApi = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        taskName: '',
        taskDescription: '',
        taskStartDate: '',
        taskEndDate: '',
        taskPriority: 1,
        taskStatus: false,
    });
    const [updateTask, setUpdateTask] = useState({
        appTaskID: '',
        taskName: '',
        taskDescription: '',
        taskStartDate: '',
        taskEndDate: '',
        taskPriority: 1,
        taskStatus: false,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${config.backendUrl}/api/AppTask`);
            setTasks(response.data);
            console.log('Tasks fetched:', response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Create a new task
    const createTask = async () => {
        try {
            const response = await axios.post(`${config.backendUrl}/api/AppTask`, newTask);
            console.log('Task created:', response.data);
            fetchTasks(); // Refresh the task list
            setNewTask({
                taskName: '',
                taskDescription: '',
                taskStartDate: '',
                taskEndDate: '',
                taskPriority: 1,
                taskStatus: false,
            });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    // Update an existing task
    const updateExistingTask = async () => {
        try {
            const response = await axios.put(`${config.backendUrl}/api/AppTask/${updateTask.appTaskID}`, updateTask);
            console.log('Task updated:', response.data);
            fetchTasks(); // Refresh the task list
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Delete a task by ID
    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`${config.backendUrl}/api/AppTask/${id}`);
            console.log('Task deleted:', response.data);
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Fetch all tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            key: 'taskName',
        },
        {
            title: 'Description',
            dataIndex: 'taskDescription',
            key: 'taskDescription',
        },
        {
            title: 'Start Date',
            dataIndex: 'taskStartDate',
            key: 'taskStartDate',
            render: (text) => moment(text).format('YYYY-MM-DD'), // Use moment for formatting
        },
        {
            title: 'End Date',
            dataIndex: 'taskEndDate',
            key: 'taskEndDate',
            render: (text) => moment(text).format('YYYY-MM-DD'), // Use moment for formatting
        },
        {
            title: 'Priority',
            dataIndex: 'taskPriority',
            key: 'taskPriority',
        },
        {
            title: 'Status',
            dataIndex: 'taskStatus',
            key: 'taskStatus',
            render: (text) => (text ? 'Completed' : 'Pending'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type="link" onClick={() => {
                        setUpdateTask(record);
                        setIsModalVisible(true);
                    }}>Edit</Button>
                    <Button type="link" danger onClick={() => deleteTask(record.appTaskID)}>Delete</Button>
                </span>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            {/*     <h1>Task API Test</h1>   */}

            {/* Display all tasks */}
            <Card title="All Tasks" style={{ marginBottom: '20px' }}>
                <Table dataSource={tasks} columns={columns} rowKey="appTaskID" />
            </Card>

            {/* Create a new task */}
            <Card title="Create New Task" style={{ marginBottom: '20px' }}>
                <Form layout="vertical">
                    <Form.Item label="Task Name">
                        <Input
                            value={newTask.taskName}
                            onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Task Description">
                        <TextArea
                            value={newTask.taskDescription}
                            onChange={(e) => setNewTask({ ...newTask, taskDescription: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Start Date">
                        <DatePicker
                            value={newTask.taskStartDate ? moment(newTask.taskStartDate) : null} // Use moment
                            onChange={(date) => setNewTask({ ...newTask, taskStartDate: date ? date.format('YYYY-MM-DD') : '' })}
                        />
                    </Form.Item>
                    <Form.Item label="End Date">
                        <DatePicker
                            value={newTask.taskEndDate ? moment(newTask.taskEndDate) : null} // Use moment
                            onChange={(date) => setNewTask({ ...newTask, taskEndDate: date ? date.format('YYYY-MM-DD') : '' })}
                        />
                    </Form.Item>
                    <Form.Item label="Priority">
                        <Select
                            value={newTask.taskPriority}
                            onChange={(value) => setNewTask({ ...newTask, taskPriority: value })}
                        >
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox
                            checked={newTask.taskStatus}
                            onChange={(e) => setNewTask({ ...newTask, taskStatus: e.target.checked })}
                        >
                            Completed
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={createTask}>Create Task</Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* Update an existing task */}
            <Modal
                title="Update Task"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setIsModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={updateExistingTask}>
                        Update
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Task Name">
                        <Input
                            value={updateTask.taskName}
                            onChange={(e) => setUpdateTask({ ...updateTask, taskName: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Task Description">
                        <TextArea
                            value={updateTask.taskDescription}
                            onChange={(e) => setUpdateTask({ ...updateTask, taskDescription: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Start Date">
                        <DatePicker
                            value={updateTask.taskStartDate ? moment(updateTask.taskStartDate) : null} // Use moment
                            onChange={(date) => setUpdateTask({ ...updateTask, taskStartDate: date ? date.format('YYYY-MM-DD') : '' })}
                        />
                    </Form.Item>
                    <Form.Item label="End Date">
                        <DatePicker
                            value={updateTask.taskEndDate ? moment(updateTask.taskEndDate) : null} // Use moment
                            onChange={(date) => setUpdateTask({ ...updateTask, taskEndDate: date ? date.format('YYYY-MM-DD') : '' })}
                        />
                    </Form.Item>
                    <Form.Item label="Priority">
                        <Select
                            value={updateTask.taskPriority}
                            onChange={(value) => setUpdateTask({ ...updateTask, taskPriority: value })}
                        >
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox
                            checked={updateTask.taskStatus}
                            onChange={(e) => setUpdateTask({ ...updateTask, taskStatus: e.target.checked })}
                        >
                            Completed
                        </Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TaskApi;