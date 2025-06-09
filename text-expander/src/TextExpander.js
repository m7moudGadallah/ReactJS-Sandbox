import PropTypes from "prop-types";
import { useState } from "react";

TextExpander.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  collapsedNumWords: PropTypes.number,
  children: PropTypes.node,
};

export function TextExpander({
  className,
  expanded = false,
  expandButtonText = "See More",
  collapseButtonText = "Hide",
  buttonColor = "#584ea9",
  collapsedNumWords = 10,
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const numOfWords = children.split(" ").length;
  const txtMessage =
    isExpanded || numOfWords <= collapsedNumWords
      ? children
      : `${children.split(" ").slice(0, collapsedNumWords).join(" ")} ...`;

  return (
    <p className={className}>
      {txtMessage}
      {numOfWords > collapsedNumWords && (
        <TextExpanderToggler
          onClick={() => setIsExpanded(!isExpanded)}
          buttonColor={buttonColor}
        >
          {isExpanded ? collapseButtonText : expandButtonText}
        </TextExpanderToggler>
      )}
    </p>
  );
}

const togglerBtnStyling = {
  background: "none",
  border: "none",
  font: "inherit",
  cursor: "pointer",
  marginLeft: "6px",
  color: "#584ea9",
};

function TextExpanderToggler({ onClick, btnColor, children }) {
  return (
    <button style={{ ...togglerBtnStyling, color: btnColor }} onClick={onClick}>
      {children}
    </button>
  );
}
