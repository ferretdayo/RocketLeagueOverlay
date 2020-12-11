import React from 'react'
import styled from 'styled-components'
import Text from '../../atoms/Texts/Text'
import { Color } from '../../../constants/Styles/Color'
import { PlayerStatus } from '../../../redux/stores/rocketleague/types'
import { MAX_PLAYER_NAME_LENGTH } from '../../../constants/RocketLeague/Misc'

type Props = {
  readonly playerInfo: PlayerStatus
  readonly targetPlayer: string
  readonly teamColor?: Color
  readonly style?: object
}

const PlayerBoost: React.FC<Props> = ({ playerInfo, targetPlayer, teamColor = Color.BLUE, style = {} }: Props) => {
  let playerNamePosition: any = {}
  let boostNumberPosition: any = {}
  let boostPosition: any = {}
  if (teamColor === Color.BLUE) {
    playerNamePosition.left = '6px'
    boostNumberPosition.right = '6px'
    boostPosition.margin = '0 0 0 auto'
  } else {
    playerNamePosition.right = '6px'
    boostNumberPosition.left = '6px'
  }

  return (
    <div key={playerInfo.id}>
      <StyledDiv active={playerInfo.id === targetPlayer ? styles.targetPlayer : {}}>
        <Text
          text={playerInfo.name.length > MAX_PLAYER_NAME_LENGTH ? `${playerInfo.name.substr(0, MAX_PLAYER_NAME_LENGTH)}...` : playerInfo.name}
          color={Color.WHITE}
          style={{ ...styles.playerName, ...playerNamePosition }} />
        <Text
          text={playerInfo.boost.toString()}
          color={Color.WHITE}
          style={{ ...styles.playerBoost, ...boostNumberPosition }} />
        <StyledDivBoost backgroundColor={teamColor} boostWidth={playerInfo.boost + "%"} style={{ ...style, ...boostPosition }}></StyledDivBoost>
      </StyledDiv>
    </div>
  )
}

export default PlayerBoost

const styles = {
  playerName: {
    position: 'absolute',
    top: '7px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  playerBoost: {
    position: 'absolute',
    top: '7px',
    fontWeight: 'bold'
  },
  targetPlayer: {
    boxShadow: '0 0 4px 4px rgb(255, 255, 255, 0.4)'
  }
}

type StyledDivProps = {
  readonly active: object
}

type StyledDivBoostProps = {
  readonly backgroundColor: Color
  readonly boostWidth: string
  readonly style: object
}

const StyledDiv = styled.div<StyledDivProps>`
  position: relative;
  background-color: #24242490;
  border-radius: 6px;
  margin-bottom: 6px;
  ${props => ({ ...props.active })};
`
const StyledDivBoost = styled.div<StyledDivBoostProps>`
  height: 36px;
  border-radius: 6px;
  transition: 0.5s;
  background-color: ${props => props.backgroundColor};
  width: ${props => props.boostWidth};
  ${props => ({ ...props.style })};
`