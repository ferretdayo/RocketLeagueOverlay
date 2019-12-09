import React, { MouseEvent, Dispatch } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Button from './components/atoms/Buttons/Button'
import Text from './components/atoms/Texts/Text'
import Title from './components/atoms/Texts/TitleText'
import { Color } from './constants/Styles/Color'
import { RootState, RootAction } from './redux/stores'
import { incrementCount, decrementCount } from './redux/stores/counter/actions'
import { Counter, CounterState } from './redux/stores/counter/types'
import moment from 'moment'
import styled from 'styled-components'

type Props = {
  counter: CounterState,
  increment: (count: number) => void,
  decrement: (count: number) => void,
}

const App: React.FC<Props> = ({
  counter = {
      counter: {
      count: 0,
      date: moment().toDate()
    }
  },
  decrement = (count: number) => count-1,
  increment = (count: number) => count+1,
}: Props) => {
  const { count, date } = counter.counter

  return (
    <div className="App">
      <header className="App-header">
        <Title text={"カウンターアプリ"} color={Color.WHITE}></Title>
        <Text text={count.toString()}></Text>
        <Text text={date.toLocaleString()}></Text>
        <FlexContainer>
          <Button label="引くよ！押して！" onClick={(e: MouseEvent<HTMLButtonElement>) => {decrement(count-1)}}></Button>
          <Button label="足すよ！押して！" onClick={(e: MouseEvent<HTMLButtonElement>) => {increment(count+1)}}></Button>
        </FlexContainer>
      </header>
    </div>
  )
}

const FlexContainer = styled.div`
  display: flex
`

const mapStateToProps = (state: RootState) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return {
    increment: (count: number) => dispatch(incrementCount(count)),
    decrement: (count: number) => dispatch(decrementCount(count)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
