import actionCreatorFactory from 'typescript-fsa'

export enum CounterActionTypes {
  INCREMENT = 'counter/INCREMENT',
  DECREMENT = 'counter/DECREMENT',
}
const actionCreator = actionCreatorFactory()

export const increment = actionCreator<number>(CounterActionTypes.INCREMENT)
export const decrement = actionCreator<number>(CounterActionTypes.DECREMENT)
