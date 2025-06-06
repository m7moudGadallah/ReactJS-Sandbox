export default function Button({
  textColor = "#fff",
  bgColor = "#7950f2",
  onClick,
  disabled,
  children,
}) {
  return (
    <button
      style={{
        color: disabled ? "black" : textColor,
        backgroundColor: disabled ? "#e7e7e7" : bgColor,
        border: "none",
        cursor: "pointer",
        padding: "10px 15px",
        borderRadius: "100px",
        fontSize: "14px",
        fontWeight: "bold",
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
