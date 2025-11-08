import { useState } from "react";
import { useDebouncedCallback } from "./hooks/useDebouncedCallback";

interface AdvancedDebouncedActionProps {
  onStart: () => void;
  onUnmount: () => void;
}

function AdvancedDebouncedAction({
  onStart,
  onUnmount,
}: AdvancedDebouncedActionProps) {
  const [bgColor, setBgColor] = useState("#ffffff");

  const debouncedPaint = useDebouncedCallback(() => {
    console.log("Changing background color (Advanced)");
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setBgColor(randomColor);
  }, 5000);

  const handleStartClick = () => {
    onStart();
    debouncedPaint();
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: "20px",
        borderRadius: "8px",
        margin: "20px 0",
        border: "2px solid #4CAF50",
      }}
    >
      <h2>Advanced Debounced Action Component</h2>
      <p style={{ fontSize: "14px", color: "#666" }}>
        Cancels pending actions on unmount
      </p>
      <button onClick={handleStartClick} style={{ marginRight: "10px" }}>
        Start
      </button>
      <button onClick={onUnmount}>Unmount</button>
    </div>
  );
}

export default AdvancedDebouncedAction;
