import React, { ReactElement } from 'react'
import styled, { css } from 'styled-components'

import Icon from '../atoms/Icon'

type BoxType = 'info' | 'success' | 'error' | 'warning'
type StyleProps = { backgroundColor: string; color: string; dimension: string }

const BoxNode = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  padding: 12px 18px;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};

  & > * {
    margin-right: 1rem;
  }

  ${props =>
    props.dimension &&
    props.dimension === 'sm' &&
    css`
      padding: 7px;
      border-radius: 4px;
      font-size: 14px;

      > .material-icons {
        font-size: 20px;
      }

      & > * {
        margin-right: 0.5rem;
      }
    `}
`

const StyledMessage = styled.div<Pick<StyleProps, 'dimension'>>`
  font-size: 12px;
  letter-spacing: 0;
  line-height: 20px;

  ${props =>
    props.dimension &&
    props.dimension === 'sm' &&
    css`
      font-size: 14px;
      line-height: 17px;
    `}
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
  dimension?: string
  type?: BoxType
}

const BoxMessage = ({
  type = 'info',
  color,
  backgroundColor,
  dimension = 'md',
  children,
}: BoxMessageProps) => {
  return (
    <BoxNode backgroundColor={backgroundColor} color={color} dimension={dimension}>
      <BoxIcon boxType={type} />
      <StyledMessage dimension={dimension}>{children}</StyledMessage>
    </BoxNode>
  )
}

export default BoxMessage
