export interface Prefecture {
    prefCode: number,
    prefName: string
}

export interface ResasState {
    prefectures: Prefecture[]
}

export const FETCH_PREFECTURES = 'FETCH_PREFECTURES'

interface FetchPrefecturesAction {
    type: typeof FETCH_PREFECTURES
    payload: Prefecture[]
}


export type ResasActionTypes = FetchPrefecturesAction