import { CounterState, CounterActionTypes, INCREMENT_COUNT, DECREMENT_COUNT } from './types'
import moment from 'moment'

const initialState: CounterState = {
  counter: {
    count: 0,
    date: moment().toDate()
  }
}

export function counterReducer(
  state = initialState,
  action: CounterActionTypes
): CounterState {
  switch (action.type) {
    case INCREMENT_COUNT: 
      return {
        counter: {
          ...action.payload
        }
      }
    case DECREMENT_COUNT:
      return {
        counter: {
          ...action.payload
        }
      }
    default: 
      return state
  }
}