export default function Counter({
  label,
  count,
  incrementHandler,
  decrementHandler,
}) {
  return (
    <div className="counter">
      <button onClick={incrementHandler}>
        <span>+</span>
      </button>
      <p>{`${label}: ${count}`}</p>
      <button onClick={decrementHandler}>
        <span>−</span>
      </button>
    </div>
  );
}
