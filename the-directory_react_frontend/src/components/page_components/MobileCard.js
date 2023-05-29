import React, { useEffect, useState } from "react";
import "../../assets/styles/mainCard.css";
import styling from "../../assets/styles/MobileCard.module.css";

export default function MobileCard() {
  const [flip, setFlip] = useState(false);

  function flipCard() {
    setFlip(!flip);

    if (flip) {
      console.log("Front");
    } else {
      console.log("Back");
    }
  }


  return (
  <div className="card-grid">

    <div className={`card ${flip ? "flip" : ""}`}>

      <div className="front" onClick={flipCard}>
        <h1>Front card</h1>
        <div>Hi there!</div>
      </div>

      <div className="back" onClick={flipCard}>
      <h1>Back Card</h1>
        <div className="backInfo">
          <div className="backTextWrapper">
            <div>This is some text for the back card</div>
          </div>
        </div>
      </div>

    </div>

  </div>
  );
}
