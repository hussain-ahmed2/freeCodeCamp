import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const defaultSessionDuration = 25;
  const defaultBreakDuration = 5;

  const [sessionDuration, setSessionDuration] = useState(defaultSessionDuration);
  const [breakDuration, setBreakDuration] = useState(defaultBreakDuration);
  const [currentDuration, setCurrentDuration] = useState(defaultSessionDuration * 60);
  const [isSession, setIsSession] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [display, setDisplay] = useState("25:00");

  // Update display whenever current duration changes
  useEffect(() => {
    const minutes = Math.floor(currentDuration / 60);
    const seconds = currentDuration % 60;
    setDisplay(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
  }, [currentDuration]);

  // Timer interval logic
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setCurrentDuration((prev) => {
          if (prev <= 0) {
            const nextDuration = isSession ? breakDuration : sessionDuration;
            setIsSession(!isSession); // Toggle session/break
            return nextDuration * 60; // Set next duration
          }
          return prev - 1; // Decrement current duration
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup on unmount or isActive change
  }, [isActive, isSession, sessionDuration, breakDuration]);

  // Handle timer start/pause
  const toggleTimer = () => {
    setIsActive((prev) => !prev);
    if (!isActive) {
      // Start timer with current session duration or current duration
      if (currentDuration === 0) {
        setCurrentDuration(sessionDuration * 60); // Start with session duration if it's reset
      }
    }
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setSessionDuration(defaultSessionDuration);
    setBreakDuration(defaultBreakDuration);
    setCurrentDuration(defaultSessionDuration * 60);
    setIsSession(true); // Reset to session
  };

  // Control length adjustments
  const incrementSession = () => {
    if (!isActive) {
      setSessionDuration((prev) => Math.min(prev + 1, 60));
      if (isSession) {
        setCurrentDuration((prev) => prev + 60); // Adjust current time if it's the session
      }
    }
  };

  const decrementSession = () => {
    if (!isActive) {
      setSessionDuration((prev) => Math.max(prev - 1, 1));
      if (isSession) {
        setCurrentDuration((prev) => Math.max(prev - 60, 60)); // Adjust current time if it's the session and avoid going below 0
      }
    }
  };

  const incrementBreak = () => {
    if (!isActive) {
      setBreakDuration((prev) => Math.min(prev + 1, 60));
    }
  };

  const decrementBreak = () => {
    if (!isActive) {
      setBreakDuration((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <div className="container">
      <div className="title">25 + 5 Clock</div>
      <div className="length-control">
        <div id="break-label">Break Length</div>
        <div className="btn-container">
          <button id="break-increment" onClick={incrementBreak}>+</button>
          <div>{breakDuration}</div>
          <button id="break-decrement" onClick={decrementBreak}>-</button>
        </div>
      </div>
      <div className="length-control">
        <div id="session-label">Session Length</div>
        <div className="btn-container">
          <button id="session-increment" onClick={incrementSession}>+</button>
          <div>{sessionDuration}</div>
          <button id="session-decrement" onClick={decrementSession}>-</button>
        </div>
      </div>
      <div className="timer">
        <div id="timer-label">{isSession ? "Session" : "Break"}</div>
        <div id="timer-left">{display}</div>
        <div className="timer-control">
          <button id="start_stop" onClick={toggleTimer}>
            {isActive ? "Pause" : "Start"}
          </button>
          <button id="reset" onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
