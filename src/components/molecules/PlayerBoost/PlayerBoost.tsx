import React from 'react'
import styled from 'styled-components'
import Text from '../../atoms/Texts/Text'
import { Color } from '../../../constants/Styles/Color'
import { PlayerStatus } from '../../../redux/stores/rocketleague/types'
import { MAX_PLAYER_NAME_LENGTH } from '../../../constants/RocketLeague/Misc'
import { FontSize } from '../../../constants/Styles/FontSize'

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
  } else {
    playerNamePosition.right = '6px'
    boostNumberPosition.left = '6px'
    boostPosition.margin = '0 0 0 auto'
  }

  return (
    <div key={playerInfo.id}>
      {playerInfo.isDead ? (
        <StyledDemoDiv>
          <Text
            text={'DEMOLISHED'}
            color={Color.WHITE}
            size={FontSize.SIZE12}
            style={{ letterSpacing: '2px' }} />
        </StyledDemoDiv>
      ) : (
          <StyledDiv active={playerInfo.id === targetPlayer ? styles.targetPlayer : {}}>
            <Text
              text={playerInfo.name.length > MAX_PLAYER_NAME_LENGTH ? `${playerInfo.name.substr(0, MAX_PLAYER_NAME_LENGTH)}...` : playerInfo.name}
              color={Color.WHITE}
              size={FontSize.SIZE12}
              style={{ ...styles.playerName, ...playerNamePosition }} />
            <Text
              text={playerInfo.boost.toString()}
              color={Color.WHITE}
              size={FontSize.SIZE12}
              style={{ ...styles.playerBoost, ...boostNumberPosition }} />
            <StyledDivBoost backgroundColor={teamColor} boostWidth={playerInfo.boost + "%"} style={{ ...style, ...boostPosition }}></StyledDivBoost>
          </StyledDiv>
        )}
    </div>
  )
}

export default PlayerBoost

const styles = {
  playerName: {
    margin: '0 !important',
    position: 'absolute',
    top: '11px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  playerBoost: {
    margin: '0 !important',
    position: 'absolute',
    top: '11px',
    fontWeight: 'bold'
  },
  targetPlayer: {
    boxShadow: '0 0 4px 4px rgb(255, 255, 255, 0.4)'
  }
}

type StyledDivProps = {
  readonly active: object
}

type StyledDemoDivProps = {
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
  height: 36px;
  width: 100%;
  ${props => ({ ...props.active })};
`

const StyledDemoDiv = styled.div<StyledDemoDivProps>`
  display: flex;
  justify-content: center;
  align-item: center;
  background-color: #ff000090;
  border-radius: 6px;
  margin-bottom: 6px;
  height: 36px;
  width: 100%;
`

const StyledDivBoost = styled.div<StyledDivBoostProps>`
  height: 36px;
  border-radius: 6px;
  transition: 0.5s;
  background-color: ${props => props.backgroundColor};
  width: ${props => props.boostWidth};
  ${props => ({ ...props.style })};
`