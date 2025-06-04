import Button from "./Button";

export default function StepSliderControl({
  numOfSteps,
  currStep,
  previousHandler,
  nextHandler,
}) {
  return (
    <div className="buttons">
      <Button
        content="Previous"
        onClick={previousHandler}
        disabled={currStep === 1}
      />
      <Button
        content="Next"
        onClick={nextHandler}
        disabled={currStep >= numOfSteps}
      />
    </div>
  );
}
