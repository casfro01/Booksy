import Homescreen from "./Homescreen";
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Homescreen/>
    </>
  )
}

export default App
