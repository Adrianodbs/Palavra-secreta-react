import { useCallback, useEffect, useState } from 'react'

// components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

// styles
import './App.css'

// data
import { wordsList } from './data/words'

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const pickWordAndPickCategory = () => {
    //pegar categoria aleatória
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pegar palavra aleatória
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }

  //Começar o jogo
  const startGame = () => {
    // pick word and pick category
    const { word, category } = pickWordAndPickCategory()

    //transformar a palavra em letras
    let wordLetters = word.split('')

    wordLetters = wordLetters.map(l => l.toLowerCase())
    console.log(wordLetters)

    //setar os estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(letters)

    setGameStage(stages[1].name)
  }

  //process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //Restart
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  )
}

export default App
