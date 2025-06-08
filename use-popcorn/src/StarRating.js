import { useEffect, useState } from "react";

const styles = {
  mainContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  starsContainer: {
    display: "flex",
    gap: "4px",
    cursor: "pointer",
  },
  ratingText: {
    lineHeight: "0",
    color: "#fcc419",
    margin: 0,
  },
};

export default function StarRating({
  maxRating = 5,
  initRating = 0,
  size = "2rem",
  children,
  color = "#fcc419",
}) {
  const [rating, setRating] = useState(initRating);
  const [selectedStar, setSelectedStar] = useState(initRating);

  useEffect(() => {
    setSelectedStar(rating);
  }, [rating]);

  return (
    <div style={styles.mainContainer}>
      <div style={styles.starsContainer}>
        {Array.from({ length: maxRating }, (_, index) => (
          <Star
            key={index + 1}
            size={size}
            onHoverIn={() => setSelectedStar(index + 1)}
            onHoverOut={() => setSelectedStar(rating)}
            onClick={() => setRating(index + 1)}
            full={index < selectedStar}
            strokeColor={color}
            fillColor={color}
          />
        ))}
      </div>
      <p style={{ ...styles.ratingText, fontSize: size, color }}>
        {selectedStar}
      </p>
      {children}
    </div>
  );
}

function Star({
  strokeColor = "#fcc419",
  fillColor = "none",
  full = false,
  size = "2rem",
  onHoverIn,
  onHoverOut,
  onClick,
}) {
  return (
    <span
      role="button"
      style={{
        width: size,
        height: size,
        display: "block",
        cursor: "pointer",
      }}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={full ? fillColor : "none"}
        stroke={strokeColor}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  );
}
