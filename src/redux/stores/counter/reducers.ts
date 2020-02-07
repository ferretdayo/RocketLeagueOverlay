import moment from 'moment'
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist'

import { CounterState } from './types'
import { increment, decrement } from './actions'

const initialState: CounterState = {
  counter: {
    count: 0,
    date: moment().toDate(),
  },
}

export const counterReducer = reducerWithInitialState(initialState)
  .case(increment, (state: CounterState, payload: number) => {
    return { counter: { count: payload, date: moment().toDate() } }
  })
  .case(decrement, (state: CounterState, payload: number) => {
    return { counter: { count: payload, date: moment().toDate() } }
  })
