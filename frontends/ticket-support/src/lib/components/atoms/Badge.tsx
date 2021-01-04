import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid grey;
  background-color: #000;
`

const StyledLabel = styled.label`
  display: flex;
  font-size: 12px;
  background-color: #fff;
`

export type BadgeProps = {
  backgroundColor?: string
  children?: ReactNode
  color?: string
  label?: string
}

export const Badge = ({
  color = 'fff',
  backgroundColor = '#000',
  children,
}: BadgeProps): ReactElement<BadgeProps> => {
  return (
    <>
      <StyledContainer>
        <StyledLabel>{children}</StyledLabel>
      </StyledContainer>
    </>
  )
}
