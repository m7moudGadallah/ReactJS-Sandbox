export default function StepNumberIndicator({ stepNum, isActive }) {
  return <div className={isActive ? "active" : ""}>{stepNum}</div>;
}
