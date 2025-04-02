import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate} from 'react-router-dom';
import React from "react";
import TaskApi from "./components/TaskApi"; // Task API component
import Register from "./components/Register"; 
import Login from "./components/Login"; 


const App = () => {
    return (
        
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<TaskApi />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
       
    );
};

export default App;
