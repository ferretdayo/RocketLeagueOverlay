import React, { MouseEvent } from 'react'
import './App.css'
import Button from './components/atoms/Buttons/Button'
import Text from './components/atoms/Texts/Text'
import Title from './components/atoms/Texts/TitleText'
import { Color } from './constants/Styles/Color'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Title text={"カウンターアプリ"} color={Color.WHITE}></Title>
        <Text text={"aaaaaa"}></Text>
        <Button label="押して！" onClick={(e: MouseEvent<HTMLButtonElement>) => {console.log("AAAAA")}}></Button>
      </header>
    </div>
  )
}

export default App
