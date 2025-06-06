import Button from "./Button";

export default function StepSliderControl({
  numOfSteps,
  currStep,
  previousHandler,
  nextHandler,
}) {
  return (
    <div className="buttons">
      <Button onClick={previousHandler} disabled={currStep === 1}>
        <span>👈 Previous</span>
      </Button>
      <Button onClick={nextHandler} disabled={currStep >= numOfSteps}>
        <span>👉 Next</span>
      </Button>
    </div>
  );
}
