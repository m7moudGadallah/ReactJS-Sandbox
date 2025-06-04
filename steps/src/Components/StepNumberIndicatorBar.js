import StepNumberIndicator from "./StepNumberIndicator";

export default function StepNumberIndicatorBar({ numOfSteps, currStep }) {
  return (
    <div className="numbers">
      {Array.from({ length: numOfSteps }, (_, index) => index + 1).map(
        (stepNum) => (
          <StepNumberIndicator
            key={stepNum}
            stepNum={stepNum}
            isActive={stepNum <= currStep}
          />
        )
      )}
    </div>
  );
}
