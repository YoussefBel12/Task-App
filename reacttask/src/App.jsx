import React from 'react';
import TaskApi from './components/TaskApi'; // Import the TaskApi component

const App = () => {
    return (
        <div>
            <h1>Task Management App</h1>
            <TaskApi /> {/* Render the TaskApi component */}
        </div>
    );
};

export default App;