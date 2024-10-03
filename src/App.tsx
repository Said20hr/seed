import { useState } from 'react'
import './App.css'
import Header from "./components/header.tsx";
import Convert from "./components/Covert.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="min-h-screen">
         <Header/>
         <div className="flex w-full items-center h-screen justify-center">
             <Convert />
         </div>

     </div>

    </>
  )
}

export default App
