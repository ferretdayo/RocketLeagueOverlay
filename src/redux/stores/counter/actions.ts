import { INCREMENT_COUNT, DECREMENT_COUNT, CounterActionTypes } from './types'

export const incrementCount = (count: number): CounterActionTypes => {
    return {
        type: INCREMENT_COUNT,
        payload: count
    }
}

export const decrementCount = (count: number): CounterActionTypes => {
    return {
        type: DECREMENT_COUNT,
        payload: count
    }
}