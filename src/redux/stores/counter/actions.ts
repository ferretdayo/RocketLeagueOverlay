import { INCREMENT_COUNT, DECREMENT_COUNT, CounterActionTypes } from './types'

export function incrementCount(count: number): CounterActionTypes {
    return {
        type: INCREMENT_COUNT,
        payload: count
    }
}

export function decrementCount(count: number): CounterActionTypes {
    return {
        type: DECREMENT_COUNT,
        payload: count
    }
}