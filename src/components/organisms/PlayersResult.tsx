import React from 'react'
import styled from 'styled-components'
import { Color } from '../../constants/Styles/Color'
import { Team } from '../../constants/RocketLeague/Team'
import { GameResult } from '../../redux/stores/rocketleague/types'

type Props = {
  readonly gameResult: GameResult
  readonly winner: string
}

const PlayersResult: React.FC<Props> = ({gameResult, winner}: Props) => {
  const targetColumn = ['goals', 'assists', 'saves', 'shots', 'score']
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
        <div style={{width: '40%'}}>
          <h2 style={{textAlign: 'center'}}>{winner === Team.BLUE.toString() ? 'Winner' : 'Loser'}</h2>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {gameResult.players.blue.map(bluePlayer => (
              <div style={{textAlign: 'center', width: `calc(100% / ${gameResult.players.blue.length})`, color: Color.WHITE}}>{bluePlayer.name}</div>
            ))}
          </div>
          <div>
            {targetColumn.map(column => (
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {gameResult.players.blue.map(bluePlayer => {
                  const key = column as keyof typeof bluePlayer
                  return (
                    <div style={{textAlign: 'center', width: `calc(100% / ${gameResult.players.blue.length})`, color: Color.WHITE}}>{bluePlayer[key]}</div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        <div>
          {targetColumn.map(column => (
            <div style={{color: Color.WHITE}}>{column.toLocaleUpperCase()}</div>
          ))}
        </div>
        <div style={{width: '40%'}}>
          <h2 style={{textAlign: 'center'}}>{winner === Team.ORANGE.toString() ? 'Winner' : 'Loser'}</h2>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {gameResult.players.orange.map(orangePlayer => (
              <div style={{textAlign: 'center', width: `calc(100% / ${gameResult.players.orange.length})`, color: Color.WHITE}}>{orangePlayer.name}</div>
            ))}
          </div>
          <div>
            {targetColumn.map(column => (
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {gameResult.players.orange.map(orangePlayer => {
                  const key = column as keyof typeof orangePlayer
                  return (
                    <div style={{textAlign: 'center', width: `calc(100% / ${gameResult.players.orange.length})`, color: Color.WHITE}}>{orangePlayer[key]}</div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayersResult
