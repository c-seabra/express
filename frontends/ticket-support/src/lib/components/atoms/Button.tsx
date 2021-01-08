/**
 * Button - atom
 *
 * Types
 *  Primary, Secondary
 *
 * States
 *  disabled, hovered
 */

import React, { ReactElement } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  font-family: 'azo-sans-web';
  font-size: 14px;
  font-weight: 300;
  // line-height: 24px;
  text-align: center;
  min-width: 75px;
  padding: 8px 32px;
  border-radius: 3px;
  border: 1px solid #0067e9;
  letter-spacing: 0;

  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    // background: gray;
    cursor: none;
    pointer-events: none;
  }
`

export const PrimaryButton = styled(StyledButton)`
  color: #ffffff;
  background-color: #0067e9;

  &:hover,
  &:focus,
  &:active {
    background-color: #0067e9;
  }
`

export const SecondaryButton = styled(StyledButton)`
  color: #0067e9;
  background-color: #ffffff;

  &:hover,
  &:focus,
  &:active {
    background-color: #0067e9;
  }
`

type ButtonProps = {
  children?: ReactElement
  className?: string
  props: any // temp
}

type Props = ButtonProps | React.InputHTMLAttributes<HTMLButtonElement>

const Button = ({ children }: Props, props): ReactElement => {
  return <button {...props}>{children}</button>
}

export default Button
