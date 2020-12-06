import React from 'react'
import styled from 'styled-components'
import { Color } from '../../../constants/Styles/Color'
import { FontSize } from '../../../constants/Styles/FontSize'

type TextProps = {
  readonly text: string
  readonly color?: Color
  readonly size?: FontSize
  readonly style: object
}

const Text: React.FC<TextProps> = ({ text, color = Color.BASE, size = FontSize.SIZE16, style = {} }: TextProps) => (
  <StyledText color={color} size={size} style={style}>{text}</StyledText>
)

export default Text

type StyledTextProps = {
  readonly color: Color
  readonly size: FontSize
  readonly style: object
}

const StyledText = styled.p<StyledTextProps>`
  margin: 0 !important;
  font-size: ${props => props.size};
  color: ${props => props.color};
  ${props => ({ ...props.style })};
`
