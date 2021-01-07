import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.span`
  font-size: 14px;
  line-height: 24px;
  padding: 4px 12px;
  color: #fff;
  background-color: #000;
  border-radius: 4px;
`

export type BadgeProps = {
  children?: ReactNode
  restProps?: ReactNode
}

export const Badge = ({ children, restProps }: BadgeProps): ReactElement<BadgeProps> => {
  return <StyledContainer ...restProps>{children}</StyledContainer>
}
