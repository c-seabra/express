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
  box-sizing: border-box;

  font-family: 'azo-sans-web';
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  min-width: 75px;
  padding: 8px 32px;
  border-radius: 3px;
  border: 1px solid #0067e9;
  letter-spacing: 0;
  transition: background-color 250ms ease-out, color 250ms ease-out, border-color 250ms ease-out;
  color: #fff;
  background-color: #000;
  height: 50px;

  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #b8bbbf;
    color: #c1c5c9;
    border-color: #c1c5c9;
    cursor: not-allowed;
    pointer-events: none;
  }
`

export const PrimaryButton = styled(StyledButton)`
  color: #ffffff;
  background-color: #0067e9;

  &:hover,
  &:focus,
  &:active {
    border: 1px solid: #2269bf;
    background-color: #2269bf;
  }
`

export const SecondaryButton = styled(StyledButton)`
  color: #0067e9;
  background-color: #ffffff;

  &:hover,
  &:focus,
  &:active {
    background-color: #eee;
  }

  &:disabled {
    background-color: #dadee3;
  }
`

type ButtonProps = {
  children?: ReactElement
  className?: string
}

type Props = ButtonProps | React.InputHTMLAttributes<HTMLButtonElement>

const Button = ({ children }: Props, props: any): ReactElement => {
  return <button {...props}>{children}</button>
}

export default Button
