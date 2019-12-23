import { counterReducer } from './counter/reducers'
import { resasReducer } from './resas/reducers'
import { CounterActionTypes } from './counter/types'
import { ResasActionTypes } from './resas/types'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  counter: counterReducer,
  resas: resasReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type RootActions = CounterActionTypes | ResasActionTypes