import React from 'react'
import styled from 'styled-components'
import { Color } from '../../constants/Styles/Color'
import { PlayerStatus } from '../../redux/stores/rocketleague/types'
import PlayerBoost from '../../components/molecules/PlayerBoost/PlayerBoost'

type Props = {
  readonly players: PlayerStatus[]
  readonly targetPlayer: string
  readonly teamColor: Color
}

const PlayersBoost: React.FC<Props> = ({ players = [], targetPlayer = "", teamColor = Color.BLUE }: Props) => {
  return (
    <>
      {players.map((player: PlayerStatus) => {
        return (
          <PlayerBoost
            playerInfo={player}
            targetPlayer={targetPlayer}
            teamColor={teamColor}
          />
        )
      })}
    </>
  )
}

export default PlayersBoost
