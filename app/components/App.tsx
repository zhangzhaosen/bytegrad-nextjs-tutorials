'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

const CountContext = createContext<{ count: number; setCount: Dispatch<SetStateAction<number>> }>({count: 0, setCount: () => {}})

function CountContextProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  return <CountContext.Provider value={{ count, setCount }}>{children}</CountContext.Provider>
}

export default function App(){
  return <CountContextProvider>
    <div>
      <ExampleComponent1 />
      <ExampleComponent2 />
    </div>
  </CountContextProvider>
}

export function ExampleComponent1(){
  const { count, setCount } = useContext(CountContext)
  console.log('ExampleComponent 1')
  return <div>
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <div>Exmaple component 1 {count}</div>
  </div>
}

export function ExampleComponent2(){
   console.log('ExampleComponent 2')
  
  return <div>Exmaple component 2 </div>
}