import React, { useState, useEffect } from 'react';
import logo from './logo2.svg'; // Assuming you have a logo
import './App.css'; // Assuming you have some CSS

const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Initial time is 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert('Pomodoro session completed!');
      setIsRunning(false);
    }
    return () => clearInterval(timer); // Cleanup interval on component unmount or re-render
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60); // Reset to 25 minutes
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="app">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Pomodoro Timer</h1>
      <div id="time" className="time-display">{formatTime()}</div>
      <button id="start" onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button id="reset" onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
};

export default App;
