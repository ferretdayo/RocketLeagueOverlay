import { Counter, INCREMENT_COUNT, DECREMENT_COUNT, CounterActionTypes } from './types'

export function incrementCount(newCounter: Counter): CounterActionTypes {
    return {
        type: INCREMENT_COUNT,
        payload: newCounter
    }
}

export function decrementCount(newCounter: Counter): CounterActionTypes {
    return {
        type: DECREMENT_COUNT,
        payload: newCounter
    }
}