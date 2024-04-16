import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuizContainer from './components/QuizContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      < QuizContainer />
    </>
  )
}

export default App
