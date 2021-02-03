import React, { ReactElement } from 'react'
import styled from 'styled-components'

import Icon from '../atoms/Icon'

type BoxType = 'info' | 'success' | 'error' | 'warning'

const BoxNode = styled.div<{ backgroundColor: string; color: string }>`
  display: flex;
  align-items: center;
  padding: 12px 18px;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};

  & > * {
    margin-right: 1rem;
  }
`

const StyledMessage = styled.div`
  font-size: 12px;
  letter-spacing: 0;
  line-height: 20px;
`

const BoxIcon = ({ boxType }: { boxType: BoxType }): ReactElement => {
  switch (boxType) {
    case 'error':
      return <Icon>error_outline</Icon>
    case 'success':
      return <Icon>check_circle</Icon>
    case 'warning':
      return <Icon>warning</Icon>
    case 'info':
    default:
      return <Icon>info</Icon>
  }
}

type BoxMessageProps = {
  backgroundColor: string
  children?: ReactElement
  color: string
  type: BoxType
}

const BoxMessage = ({ type, color, backgroundColor, children }: BoxMessageProps) => {
  return (
    <BoxNode backgroundColor={backgroundColor} color={color}>
      <BoxIcon boxType={type} />
      <StyledMessage>{children}</StyledMessage>
    </BoxNode>
  )
}

export default BoxMessage
