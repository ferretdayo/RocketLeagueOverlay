import React from 'react'
import styled from 'styled-components'
import { Color } from '../../../constants/Styles/Color'
import { PlayerStatus } from '../../../redux/stores/rocketleague/types'
import { Team } from '../../../constants/RocketLeague/Team'

type Props = {
  readonly players: PlayerStatus[]
  readonly isWin: boolean
  readonly targetColumn: { columnName: string, displayName: string }[]
  readonly teamColor: Team
  readonly style?: object
}

const PlayerResult: React.FC<Props> = ({ players, isWin, targetColumn, teamColor, style = {} }: Props) => {
  let color: Color
  if (teamColor === Team.ORANGE) {
    color = Color.ORANGE
  } else {
    color = Color.LIGHT_BLUE
  }
  return (
    <div style={{ width: '40%' }}>
      <StyledH2 isWin={isWin}>{isWin ? 'Winner' : 'Loser'}</StyledH2>
      <StyledPlayerNameRow>
        {players.map(player => (
          <StyledPlayerName key={player.id} playerAmount={players.length} color={color}>
            {player.name}
          </StyledPlayerName>
        ))}
      </StyledPlayerNameRow>
      <div>
        {targetColumn.map(column => (
          <StyledScoreRowDiv key={column.columnName}>
            {players.map(player => {
              const key = column.columnName as keyof typeof player
              return (
                <StyledScoreText key={player.id} playerAmount={players.length}>
                  {player[key]}
                </StyledScoreText>
              )
            })}
          </StyledScoreRowDiv>
        ))}
      </div>
    </div>
  )
}

export default PlayerResult

type StyledH2Props = {
  readonly isWin: boolean
}

const StyledH2 = styled.h2<StyledH2Props>`
  text-align: center;
  margin: 40px 0 10px;
  font-size: 36px;
  color: ${props => props.isWin ? Color.ORANGE : Color.TRANS_LIGHT_GRAY}
`

type StyledPlayerNameRowProps = {
}

const StyledPlayerNameRow = styled.div<StyledPlayerNameRowProps>`
  display: flex;
  justify-content: space-between;
`

type StyledScoreRowDivProps = {
}

const StyledScoreRowDiv = styled.div<StyledScoreRowDivProps>`
  display: flex;
  justify-content: space-between;
`

type StyledPlayerNameProps = {
  readonly playerAmount: number
  readonly color: Color
}

const StyledPlayerName = styled.div<StyledPlayerNameProps>`
  text-align: center;
  font-size: 18px;
  border-bottom: 4px solid ${props => props.color};
  padding: 14px 0;
  width: calc(100% / ${props => props.playerAmount});
  color: ${Color.WHITE};
`

type StyledScoreTextProps = {
  readonly playerAmount: number
}

const StyledScoreText = styled.div<StyledScoreTextProps>`
  text-align: center;
  font-size: 22px;
  padding: 16px 0;
  border-bottom: 1px solid ${Color.TRANS_GRAY};
  width: calc(100% / ${props => props.playerAmount});
  color: ${Color.WHITE};
`