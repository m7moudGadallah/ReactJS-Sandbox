import { useState } from "react";

export default function App() {
  return <TipCalculator />;
}

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const tip = Math.ceil((bill * (percentage1 + percentage2)) / 100);

  function handleReset() {
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <Bill bill={bill} setBill={setBill} />
      <SelectPercentage
        percentage={percentage1}
        percentageChangeHandler={setPercentage1}
      >
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage
        percentage={percentage2}
        percentageChangeHandler={setPercentage2}
      >
        How did your friend like the service?
      </SelectPercentage>
      {bill ? <Receipt bill={bill} tip={tip} /> : ""}
      <Reset resetHandler={handleReset} />
    </div>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="number"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />
    </div>
  );
}

function SelectPercentage({ percentage, percentageChangeHandler, children }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => percentageChangeHandler(+e.target.value)}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Receipt({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h3>
  );
}

function Reset({ resetHandler }) {
  return <button onClick={resetHandler}>Reset</button>;
}
