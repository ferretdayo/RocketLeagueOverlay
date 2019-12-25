import moment from 'moment'
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist'

import { CounterState, Counter } from './types'
import { increment, decrement } from './actions'

const initialState: CounterState = {
  counter: {
    count: 0,
    date: moment().toDate(),
  },
}

export const countUpReducer = reducerWithInitialState(initialState)
  .case(increment, (state: CounterState, payload: Counter): CounterState => {...state, counter: payload})
  .case(decrement, (state, payload) => state.dec(payload))
