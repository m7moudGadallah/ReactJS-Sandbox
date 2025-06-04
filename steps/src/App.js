import { useState } from "react";
import StepNumberIndicatorBar from "./Components/StepNumberIndicatorBar";
import StepMessage from "./Components/StepMessage";
import StepSliderControl from "./Components/StepSliderControl";

export default function App() {
  const steps = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];

  const [currStep, setCurrStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (currStep > 1) setCurrStep((s) => s - 1);
  }

  function handleNext() {
    if (currStep < steps.length) setCurrStep((s) => s + 1);
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((o) => !o)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <StepNumberIndicatorBar
            numOfSteps={steps.length}
            currStep={currStep}
          />
          <StepMessage currStep={currStep} message={steps[currStep - 1]} />
          <StepSliderControl
            numOfSteps={steps.length}
            currStep={currStep}
            previousHandler={handlePrevious}
            nextHandler={handleNext}
          />
        </div>
      )}
    </>
  );
}
