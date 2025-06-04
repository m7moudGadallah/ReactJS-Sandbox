export default function Button({ content, onClick, disabled }) {
  return (
    <button
      className={disabled ? "" : "active"}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
