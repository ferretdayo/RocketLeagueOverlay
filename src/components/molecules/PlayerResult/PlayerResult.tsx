import React from 'react'
import styled from 'styled-components'
import { Color } from '../../../constants/Styles/Color'
import { PlayerStatus } from '../../../redux/stores/rocketleague/types'
import { Team } from '../../../constants/RocketLeague/Team'

type Props = {
  readonly players: PlayerStatus[]
  readonly isWin: boolean
  readonly targetColumn: string[]
  readonly teamColor: Team
  readonly style?: object
}

const PlayerResult: React.FC<Props> = ({ players, isWin, targetColumn, teamColor, style = {} }: Props) => {
  return (
    <div style={{width: '40%'}}>
      <StyledH2>{isWin ? 'Winner' : 'Loser'}</StyledH2>
      <StyledPlayerNameRow>
        {players.map(player => (
          <StyledPlayerName key={player.id} playerAmount={players.length}>
            {player.name}
          </StyledPlayerName>
        ))}
      </StyledPlayerNameRow>
      <div>
        {targetColumn.map(column => (
          <StyledScoreRowDiv key={column}>
            {players.map(player => {
              const key = column as keyof typeof player
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
}

const StyledH2 = styled.h2<StyledH2Props>`
  text-align: center;
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
}

const StyledPlayerName = styled.div<StyledPlayerNameProps>`
  text-align: center;
  width: calc(100% / ${props => props.playerAmount});
  color: ${Color.WHITE};
`

type StyledScoreTextProps = {
  readonly playerAmount: number
}

const StyledScoreText = styled.div<StyledScoreTextProps>`
  text-align: center;
  width: calc(100% / ${props => props.playerAmount});
  color: ${Color.WHITE};
`