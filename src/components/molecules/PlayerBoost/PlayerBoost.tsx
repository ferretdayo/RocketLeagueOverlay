import React from 'react'
import styled from 'styled-components'
import Text from '../../atoms/Texts/Text'
import { Color } from '../../../constants/Styles/Color'
import { PlayerStatus } from '../../../redux/stores/rocketleague/types'

type Props = {
  readonly playerInfo: PlayerStatus
  readonly boostColor?: Color
  readonly style?: object
}

const PlayerBoost: React.FC<Props> = ({ playerInfo, boostColor = Color.BLUE, style = {} }: Props) => (
  <StyledDiv key={playerInfo.id}>
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
)

export default PlayerBoost

const styles = {
  playerName: {
    position: 'absolute',
    top: '4px',
    left: '6px',
    fontWeight: 'bold'
  },
  playerBoost: {
    position: 'absolute',
    top: '4px',
    right: '6px'
  }
}

type StyledDivProps = {
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
`
const StyledDivBoost = styled.div<StyledDivBoostProps>`
  height: 30px;
  border-radius: 4px;
  background-color: ${props => props.backgroundColor};
  width: ${props => props.boostWidth};
  ${props => ({ ...props.style })};
`