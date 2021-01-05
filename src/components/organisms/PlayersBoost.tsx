import React from 'react'
import { Color } from '../../constants/Styles/Color'
import { PlayerStatus } from '../../redux/stores/rocketleague/types'
import PlayerBoost from '../../components/molecules/PlayerBoost/PlayerBoost'
import { Team } from '../../constants/RocketLeague/Team'

type Props = {
  readonly players: PlayerStatus[]
  readonly targetPlayer: string
  readonly teamColor: Team
}

const PlayersBoost: React.FC<Props> = ({ players = [], targetPlayer = "", teamColor = Team.BLUE }: Props) => {
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
