import { useState } from "react";
import debounce from "lodash/debounce";

interface DebouncedActionProps {
  onStart: () => void;
  onUnmount: () => void;
}

function DebouncedAction({ onStart, onUnmount }: DebouncedActionProps) {
  const [bgColor, setBgColor] = useState("#ffffff");

  const debouncedPaint = debounce(() => {
    console.log("Changing background color");
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
      }}
    >
      <h2>Debounced Action Component</h2>
      <button onClick={handleStartClick} style={{ marginRight: "10px" }}>
        Start
      </button>
      <button onClick={onUnmount}>Unmount</button>
    </div>
  );
}

export default DebouncedAction;
