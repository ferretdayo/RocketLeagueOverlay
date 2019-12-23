export interface Counter {
    count: number
    date: Date
}

export interface CounterState {
    counter: Counter
}

export const INCREMENT_COUNT = 'INCREMENT_COUNT'
export const DECREMENT_COUNT = 'DECREMENT_COUNT'

interface IncrementAction {
    type: typeof INCREMENT_COUNT
    payload: number
}

interface DecrementAction {
    type: typeof DECREMENT_COUNT
    payload: number
}

export type CounterActionTypes = IncrementAction | DecrementAction