import { counterReducer } from './counter/reducers'
import { CounterActionTypes } from './counter/types'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  counter: counterReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type RootAction = CounterActionTypes