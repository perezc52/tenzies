import React from "react"
import './App.css';
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {

const [dice, setDice] = React.useState(allNewDice())
const [tenzies, setTenzies] = React.useState(false)
const [rolls, setRolls] = React.useState(0)
const [time, setTime] = React.useState(0);
const [running, setRunning] = React.useState(false);

React.useEffect(() => {
  let allDiceHeld = dice.every(die => die.isHeld)
  let firstValue = dice[0].value
  let allSameValue = dice.every(die => die.value === firstValue)
  if(allDiceHeld && allSameValue) {
    setTenzies(true)
    setRunning(false)
    console.log("You won!")
  }
}, [dice])

React.useEffect(() => {  
  let interval;
  if (running) {
  interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
  }, 10);
  } else if (!running) {
      clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [running])

function allNewDice() {
  let allNewDiceArray = []
  for(let i = 0; i < 10; i++) {
    allNewDiceArray.push(generateNewDie())
  }
  return allNewDiceArray
}

function generateNewDie() {
  return {
    value: Math.floor(Math.random() * 6) + 1,
    isHeld: false,
    id: nanoid()
  }
}

function rollDice() {
  if(!tenzies) {
    setRunning(true)
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
    setRolls(prevRolls => prevRolls + 1)
  }else {
    setTenzies(false)
    setDice(allNewDice())
    setRolls(0)
    setTime(0)
  }
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
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <h4>Rolls: {rolls}</h4>
        <h4>
          <div className="numbers">
          <span>Time: {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
          </div>
        </h4>
        <div className="die-container">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </div>
  )
}

export default App;
