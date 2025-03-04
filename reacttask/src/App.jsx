/*

import React from "react";
import AnimatedLightBlueBackground from "./components/AnimatedLightBlueBackground"; // Animated light blue background component
import TaskApi from "./components/TaskApi"; // Task API component



const App = () => {
    return (
        <div className="relative">
            <AnimatedLightBlueBackground /> 
            <div className="content">
                <h1>Task App</h1>
                <TaskApi /> 
            </div>
        </div>
    );
};

export default App;
*/

//up is whitout spring


import React from "react";
import { useSpring } from "@react-spring/web"; // Import animated from react-spring
import styled from "styled-components";
import AnimatedLightBlueBackground from "./components/AnimatedLightBlueBackground"; // Animated background component
import TaskApi from "./components/TaskApi"; // Task API component

// Enhanced Title with Gradient and 3D effect
const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #4e90b3;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(45deg, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3); /* Reduced shadow for sharper text */
  letter-spacing: 2px;
  margin-bottom: 40px;
  animation: gradientShift 5s ease infinite;
  
  /* Add some scaling effect on hover */
  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }

  /* Ensuring smoother rendering for scaling */
  transform-style: preserve-3d;
  will-change: transform;
  transform: translateZ(0); /* Prevent blurry scaling artifacts */

  @keyframes gradientShift {
    0% {
      background: linear-gradient(45deg, #00c6ff, #0072ff);
    }
    50% {
      background: linear-gradient(45deg, #ff6a00, #ff3f00);
    }
    100% {
      background: linear-gradient(45deg, #00c6ff, #0072ff);
    }
  }
`;

const App = () => {
    // Define the spring animation
    const props = useSpring({
        from: { opacity: 0, transform: "translateY(-50px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: { tension: 200, friction: 25 },
    });

    return (
        <div className="relative">
            <AnimatedLightBlueBackground /> {/* Animated background component */}
            <div className="content">
                {/* Use the animated.div component for the title */}
                <animated.div style={props}>
                    <Title>Task App</Title> {/* Enhanced animated title */}
                </animated.div>
                <TaskApi /> {/* Task API component */}
            </div>
        </div>
    );
};

export default App;
