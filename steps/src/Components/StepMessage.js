export default function StepMessage({ currStep, message }) {
  return <p className="message">{`Step${currStep}: ${message}`}</p>;
}
