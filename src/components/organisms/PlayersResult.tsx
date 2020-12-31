import React from 'react'
import styled from 'styled-components'
import { Color } from '../../constants/Styles/Color'
import { Team } from '../../constants/RocketLeague/Team'
import { GameResult } from '../../redux/stores/rocketleague/types'
import PlayerResult from '../molecules/PlayerResult/PlayerResult'

type Props = {
  readonly gameResult: GameResult
  readonly winner: string
}

const PlayersResult: React.FC<Props> = ({gameResult, winner}: Props) => {
  const targetColumn = ['goals', 'assists', 'saves', 'shots', 'score']
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
        <PlayerResult
          players={gameResult.players.blue}
          isWin={false}
          teamColor={Team.BLUE}
          targetColumn={targetColumn}
        />
        <div>
          {targetColumn.map(column => (
            <div key={column} style={{textAlign: 'center', color: Color.WHITE}}>{column.toLocaleUpperCase()}</div>
          ))}
        </div>
        <PlayerResult
          players={gameResult.players.orange}
          isWin={false}
          teamColor={Team.ORANGE}
          targetColumn={targetColumn}
        />
      </div>
    </>
  )
}

export default PlayersResult
