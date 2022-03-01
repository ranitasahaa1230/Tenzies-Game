import React, { useEffect, useState } from "react";
import Die from "./Die";
import "./styles.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  // const allNew Dice=arr.map((item)=>{
  //   return(
  //     const rndInt = Math.floor(Math.random() * 6) + 1 * item
  //     console.log(rndInt)
  //   )
  // })

  useEffect(
    (id) => {
      const allHeld = dice.every((die) => die.isHeld);
      const firstValue = dice[0].value;
      const allSameValue = dice.every((die) => die.value === firstValue);
      if (allHeld && allSameValue) {
        setTenzies(true);
        // console.log("You won!");
      }
    },
    [dice]
  );

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice(id) {
    if (!tenzies) {
      setDice((dice) =>
        dice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDie) =>
      oldDie.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {dice.map((item) => {
          return (
            <Die
              key={item.id}
              value={item.value}
              isHeld={item.isHeld}
              holdDice={() => holdDice(item.id)}
            />
          );
        })}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

//Add features
// css->put real dots on the dice
// track the number of rolls
//  track the time it took to win
// save your best time to local storage
