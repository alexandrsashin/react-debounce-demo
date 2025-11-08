import { useState, useRef, useEffect } from "react";
import DebouncedAction from "./DebouncedAction";
import AdvancedDebouncedAction from "./AdvancedDebouncedAction";
import "./App.css";

function App() {
  const [timer, setTimer] = useState(0);
  const [showComponent, setShowComponent] = useState(true);
  const [showAdvancedComponent, setShowAdvancedComponent] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const startTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setTimer(0);
    intervalRef.current = window.setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const handleStart = () => {
    startTimer();
  };

  const handleUnmount = () => {
    setShowComponent(false);
  };

  const handleAdvancedUnmount = () => {
    setShowAdvancedComponent(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <div>
        <h1>React Debounce Demo</h1>
        <div className="card">
          <h2>Timer: {timer} seconds</h2>

          {showComponent && (
            <DebouncedAction onStart={handleStart} onUnmount={handleUnmount} />
          )}
          {!showComponent && <p>Basic component was unmounted</p>}

          {showAdvancedComponent && (
            <AdvancedDebouncedAction
              onStart={handleStart}
              onUnmount={handleAdvancedUnmount}
            />
          )}
          {!showAdvancedComponent && <p>Advanced component was unmounted</p>}
        </div>
      </div>
    </>
  );
}

export default App;
