import React from 'react'
import styled from 'styled-components'
import Text from '../../atoms/Texts/Text'
import { Color } from '../../../constants/Styles/Color'
import { PlayerStatus } from '../../../redux/stores/rocketleague/types'

type Props = {
  readonly playerInfo: PlayerStatus
  readonly targetPlayer: string
  readonly boostColor?: Color
  readonly style?: object
}

const PlayerBoost: React.FC<Props> = ({ playerInfo, targetPlayer, boostColor = Color.BLUE, style = {} }: Props) => (
  <div key={playerInfo.id}>
    <StyledDiv active={playerInfo.id === targetPlayer ? styles.targetPlayer : {}}>
      <Text
        text={playerInfo.name}
        color={Color.WHITE}
        style={styles.playerName} />
      <Text
        text={playerInfo.boost.toString()}
        color={Color.WHITE}
        style={styles.playerBoost} />
      <StyledDivBoost backgroundColor={boostColor} boostWidth={playerInfo.boost + "%"} style={style}></StyledDivBoost>
    </StyledDiv>
  </div>
)

export default PlayerBoost

const styles = {
  playerName: {
    position: 'absolute',
    top: '6px',
    left: '6px',
    fontWeight: 'bold'
  },
  playerBoost: {
    position: 'absolute',
    top: '6px',
    right: '6px'
  },
  targetPlayer: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: '4px'
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
  background-color: #242424ab;
  border-radius: 4px;
  margin-bottom: 6px;
  ${props => ({ ...props.active })};
`
const StyledDivBoost = styled.div<StyledDivBoostProps>`
  height: 36px;
  border-radius: 4px;
  background-color: ${props => props.backgroundColor};
  width: ${props => props.boostWidth};
  ${props => ({ ...props.style })};
`