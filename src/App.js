import React from "react"
import './App.css';
import Die from "./Die"
import {nanoid} from "nanoid"

function App() {

const [dice, setDice] = React.useState(allNewDice())

function allNewDice() {
  let allNewDiceArray = []
  for(let i = 0; i < 10; i++) {
    allNewDiceArray.push({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: true,
      id: nanoid()
    })
  }
  return allNewDiceArray
}

function rollDice() {
  setDice(allNewDice())
}

function holdDice(id) {
  setDice(oldDice => oldDice.map(die => {
    return die.id === id ? {...die, isHeld: !die.isHeld} : die
  }))
}

const diceElements = dice.map((die, i) => {
  return (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
  )
})

  return (
    <div>
      <main>
        <div className="die-container">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>Roll Dice</button>
      </main>
    </div>
  )
}

export default App;
