import { useState } from 'react'
import Die from './Die.jsx'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



function App() {
  const [dice, setDice] = useState(() => genertedAllNewDice())

  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)

  const gameWon = allHeld && allSameValue


  function genertedAllNewDice() {
    let dice = []
    for (let i = 0; i < 10; i++) {
      dice.push({ value: Math.floor(Math.random() * 6) + 1, isHeld: false, id: nanoid() })
    }
    return dice
  }

  function hold(id) {
    const updatedDice = dice.map((die) => {
      if (die.id === id) {
        return { ...die, isHeld: !die.isHeld }
      }
      return die
    })
    console.log(id)
    setDice(updatedDice)

  }

  function rollDice() {
    const updatedDice = dice.map((die) => {
      if (!die.isHeld) {
        return { ...die, value: Math.floor(Math.random() * 6) + 1 }
      }
      return die
    })

    setDice(updatedDice)
  }

  const diceElements = dice.map((die) =>

    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
      id={die.id} />
  )

  //If game is won, display a message
  //If game is not won, display the dice and roll button
  return (
    <>
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
      </main>
    </>
  )
}

export default App
