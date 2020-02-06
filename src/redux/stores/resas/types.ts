export interface Prefecture {
  prefCode: number
  prefName: string
}

export interface ResasState {
  prefectures: Prefecture[]
}

export interface ResasParams {}
export interface ResasResult {
  prefectures: Prefecture[]
}
export interface ResasError {
  error: Error
}
