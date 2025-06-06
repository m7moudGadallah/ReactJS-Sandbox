import { useState } from "react";

export default function Flashcard({ frontSideContent, backSideContent }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={isSelected ? "selected" : ""}
      onClick={() => setIsSelected(!isSelected)}
    >
      <p>{isSelected ? backSideContent : frontSideContent}</p>
    </div>
  );
}
