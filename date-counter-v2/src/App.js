import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  function getDate(diff) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + diff);
    return currentDate;
  }

  function getDateMessage(diff) {
    const date = getDate(diff).toDateString();

    if (diff === 0) return `Today is ${date}`;

    if (diff > 0) return `${diff} days from today is ${date}`;

    return `${-diff} days ago from today is ${date}`;
  }

  return (
    <div className="app">
      <div class="step-inp">
        <span>Step: {step}</span>
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(+e.target.value)}
        />
      </div>
      <div className="count-inp">
        <button>+</button>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
        />
        <button>-</button>
      </div>
      <h5>{getDateMessage(count * step)}</h5>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
