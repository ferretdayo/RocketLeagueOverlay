import React from 'react'
import styled from 'styled-components'
import { Color } from '../../../constants/Styles/Color'

type TextProps = {
  readonly text: string
  readonly color?: Color
}

const Text: React.FC<TextProps> = (props) => {
  const { text, color = Color.WHITE } = props
  return (
    <StyledText color={color}>{text}</StyledText>
  )
}

export default Text

type StyledTextProps = {
  readonly color: Color
}

const StyledText = styled.p<StyledTextProps>`
  font-size: 1.4em;
  color: ${props => props.color};
`
