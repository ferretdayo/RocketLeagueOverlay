import React, { MouseEvent } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Button from './components/atoms/Buttons/Button'
import Text from './components/atoms/Texts/Text'
import Title from './components/atoms/Texts/TitleText'
import { Color } from './constants/Styles/Color'
import { RootState } from './redux/stores'
import { incrementCount, decrementCount } from './redux/stores/counter/actions'
import { fetchPrefectures, syncChangePrefectures } from './redux/stores/resas/actions'
import { CounterState } from './redux/stores/counter/types'
import moment from 'moment'
import styled from 'styled-components'
import { ResasState } from './redux/stores/resas/types'

type Props = {
  counter: CounterState,
  resas: ResasState,
  incrementCount: (count: number) => void,
  decrementCount: (count: number) => void,
  fetchPrefectures: () => void,
  syncChangePrefectures: () => void,
}

const App: React.FC<Props> = ({
  counter = {
    counter: {
      count: 0,
      date: moment().toDate()
    }
  },
  resas = {
    prefectures: []
  },
  incrementCount = (count: number) => count+1,
  decrementCount = (count: number) => count-1,
}: Props) => {
  const { count, date } = counter.counter

  const onClickIncrementButton = (e: MouseEvent<HTMLButtonElement>) => incrementCount(count+1)
  const onClickDecrementButton = (e: MouseEvent<HTMLButtonElement>) => decrementCount(count-1)
  const onClickResasDataFetchButton = () => {fetchPrefectures(); syncChangePrefectures()}

  return (
    <div className="App">
      <header className="App-header">
        <Title text={"カウンターアプリ"} color={Color.WHITE}></Title>
        <Text text={count.toString()} color={Color.WHITE}></Text>
        <Text text={date.toLocaleString()}></Text>
        <FlexContainer>
          <Button label="引くよ！押して！" onClick={onClickDecrementButton}></Button>
          <Button label="足すよ！押して！" onClick={onClickIncrementButton}></Button>
        </FlexContainer>
        <div>
          <Text text={resas.prefectures.toString()}></Text>
          <Button label="Resasからデータ取得" onClick={onClickResasDataFetchButton}></Button>
        </div>
      </header>
    </div>
  )
}

const FlexContainer = styled.div`
  display: flex
`

const mapStateToProps = (state: RootState) => {
  return {
    counter: state.counter,
    resas: state.resas,
  }
}

const mapDispatchToProps = {
  incrementCount,
  decrementCount,
  fetchPrefectures,
  syncChangePrefectures,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
