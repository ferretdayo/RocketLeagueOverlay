import actionCreatorFactory from 'typescript-fsa'

import { Counter } from './types'

export enum CounterActionTypes {
  INCREMENT = 'counter/INCREMENT',
  DECREMENT = 'counter/DECREMENT',
}
const actionCreator = actionCreatorFactory()

export const increment = actionCreator<Counter>(CounterActionTypes.INCREMENT)
export const decrement = actionCreator<Counter>(CounterActionTypes.INCREMENT)
