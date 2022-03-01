import React from "react";

export default function Die({ value, isHeld, holdDice }) {
  return (
    <div
      className="die-face"
      style={{ backgroundColor: isHeld ? "#59E391" : "white" }}
      onClick={holdDice}
    >
      <h2 className="die-num">{value}</h2>
    </div>
  );
}
