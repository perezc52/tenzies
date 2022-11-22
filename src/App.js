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
      isHeld: false,
      id: nanoid()
    })
  }
  console.log(allNewDiceArray)
  return allNewDiceArray
}

function rollDice() {
  setDice(allNewDice())
}

const diceElements = dice.map((die, i) => {
  return (
    <Die key={die.id} value={die.value}/>
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
