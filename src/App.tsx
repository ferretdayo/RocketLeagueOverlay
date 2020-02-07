import React, { MouseEvent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import styled from 'styled-components'

import './App.css'
import Button from './components/atoms/Buttons/Button'
import Text from './components/atoms/Texts/Text'
import Title from './components/atoms/Texts/TitleText'
import { Color } from './constants/Styles/Color'
import { RootState } from './redux/stores'
import { increment, decrement } from './redux/stores/counter/actions'
import { syncChangePrefectures } from './redux/stores/resas/actions'
import { CounterState } from './redux/stores/counter/types'
import { ResasState } from './redux/stores/resas/types'

type Props = {
  counter: CounterState
  resas: ResasState
  increment: (count: number) => void
  decrement: (count: number) => void
  syncChangePrefectures: () => Promise<void>
}

const App: React.FC<Props> = ({
  counter = {
    counter: {
      count: 0,
      date: moment().toDate(),
    },
  },
  resas = {
    prefectures: [],
  },
  increment = (count: number) => {},
  decrement = (count: number) => {},
  syncChangePrefectures = () => new Promise(_.noop),
}: Props) => {
  const { count, date } = counter.counter

  const onClickIncrementButton = (e: MouseEvent<HTMLButtonElement>) => increment(count + 1)
  const onClickDecrementButton = (e: MouseEvent<HTMLButtonElement>) => decrement(count - 1)
  const onClickResasDataFetchButton = (e: MouseEvent<HTMLButtonElement>) => syncChangePrefectures()

  return (
    <div className="App">
      <header className="App-header">
        <Title text={'カウンターアプリ'} color={Color.WHITE}></Title>
        <Text text={count.toString()} color={Color.WHITE}></Text>
        <Text text={date.toLocaleString()}></Text>
        <FlexContainer>
          <Button label="引くよ！押して！" onClick={onClickDecrementButton}></Button>
          <Button label="足すよ！押して！" onClick={onClickIncrementButton}></Button>
        </FlexContainer>
        <div>
          <div style={{ height: '300px', overflowY: 'scroll' }}>
            {resas.prefectures.length > 0 &&
              resas.prefectures.map(prefecture => (
                <div key={prefecture.prefCode}>{prefecture.prefName || 'a'}</div>
              ))}
          </div>
          <Button label="Resasからデータ取得" onClick={onClickResasDataFetchButton}></Button>
        </div>
      </header>
    </div>
  )
}

const FlexContainer = styled.div`
  display: flex;
`

const mapStateToProps = (state: RootState) => {
  return {
    counter: state.counter,
    resas: state.resas,
  }
}

const mapDispatchToProps = {
  increment,
  decrement,
  syncChangePrefectures,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
