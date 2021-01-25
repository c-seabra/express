import React from 'react'
import styled, { css } from 'styled-components'

const StyledIcon = styled.span<{ color?: string }>`
  cursor: pointer;

  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `}
`

type Props = React.BaseHTMLAttributes<HTMLSpanElement> & {
  color?: string
}

const Icon = ({ color, children, ...props }: Props) => {
  return (
    <StyledIcon className="material-icons" color={color} {...props}>
      {children}
    </StyledIcon>
  )
}

export default Icon
