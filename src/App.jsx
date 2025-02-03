import { useRef, useState, useEffect } from 'react'
import Die from './Die.jsx'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



function App() {
  const [dice, setDice] = useState(() => genertedAllNewDice())
  const buttonRef = useRef(null)

  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)

  const gameWon = allHeld && allSameValue

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

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
    Multiple
    setDice(updatedDice)

  }

  function rollDice() {
    if (!gameWon) {
      const updatedDice = dice.map((die) => {
        if (!die.isHeld) {
          return { ...die, value: Math.floor(Math.random() * 6) + 1 }
        }
        return die
      })

      setDice(updatedDice)
    } else {
      setDice(genertedAllNewDice())
    }
  }

  const diceElements = dice.map((die) =>

    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
      id={die.id} />
  )


  return (
    <>
      {gameWon && <Confetti />}
      <div aria-live='polite' aria-atomic='true' className='sr-only'>
        {gameWon && <p aria-live='assertive'>You won! Press "New Game" to start again</p>}
      </div>
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button ref={buttonRef} className="roll-dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
      </main>
    </>
  )
}

export default App
