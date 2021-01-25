import React, { ReactElement } from 'react'
import styled from 'styled-components'

const StyledIcon = styled.span`
  cursor: pointer;
`

type Props = React.InputHTMLAttributes<HTMLLabelElement> & {
  children: ReactElement | string
}

const Icon = ({ children, ...props }: Props) => {
  return (
    <StyledIcon className="material-icons" {...props}>
      {children}
    </StyledIcon>
  )
}

export default Icon
