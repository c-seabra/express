import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.span`
  cursor: pointer;
`

type Props = React.BaseHTMLAttributes<HTMLSpanElement>

const Icon = ({ children, ...props }: Props) => {
  return (
    <StyledIcon className="material-icons" {...props}>
      {children}
    </StyledIcon>
  )
}

export default Icon
