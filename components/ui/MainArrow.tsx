import React from "react";

function MainArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 600"
      width="50"
      height="600"
    >
      <line
        x1="25"
        y1="10"
        x2="25"
        y2="200"
        stroke="#7f3828"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="25"
        y1="200"
        x2="10"
        y2="180"
        stroke="#7f3828"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="25"
        y1="200"
        x2="40"
        y2="180"
        stroke="#7f3828"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default MainArrow;
