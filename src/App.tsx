import React, { MouseEvent } from 'react'
import logo from './logo.svg'
import './App.css'
import Button from './components/atoms/Button'
import Text from './components/atoms/Text'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Text text={"aaaaaa"}></Text>
        <Button label="aaaa" onClick={(e: MouseEvent<HTMLButtonElement>) => {console.log("AAAAA")}}></Button>
      </header>
    </div>
  )
}

export default App
