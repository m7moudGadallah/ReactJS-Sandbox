import { useState } from "react";
import Counter from "./Components/Counter";
import DateMessage from "./Components/DateMessage";

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <Counter
        label="Step"
        count={step}
        incrementHandler={() => setStep((s) => s + 1)}
        decrementHandler={() => setStep((s) => Math.max(1, s - 1))}
      />
      <Counter
        label="Count"
        count={count}
        incrementHandler={() => setCount((c) => c + step)}
        decrementHandler={() => setCount((c) => c - step)}
      />
      <DateMessage shift={count} />
    </div>
  );
}
