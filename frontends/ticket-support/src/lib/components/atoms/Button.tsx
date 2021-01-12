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

export const Button = styled.button`
  display: inline-flex;
  box-sizing: border-box;

  font-family: 'azo-sans-web', sans-serif;
  font-size: 14px;
  font-weight: normal;

  text-align: center;
  min-width: 75px;
  padding: 0 32px;
  border-radius: 3px;
  border: 1px solid #0067e9;
  letter-spacing: 0;
  transition: all 0.3s ease-out;
  height: 50px;

  cursor: pointer;

  color: #ffffff;
  background-color: #0067e9;

  &:hover {
    border: 1px solid: #2269bf;
    background-color: #2269bf;
  }


  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.6);
    color: #e0e1e2;
    border-color: #c1c5c9;
    cursor: not-allowed;
    pointer-events: none;
  }
`

const PrimaryButton = styled(Button)`
  color: #ffffff;
  background-color: #0067e9;

  &:hover {
    border: 1px solid: #2269bf;
    background-color: #2269bf;
  }
`

export const SecondaryButton = styled(Button)`
  color: #0067e9;
  background-color: #ffffff;

  &:hover {
    background-color: #2269bf;
    color: #ffffff;
  }
`

// type ButtonProps = {
//   children?: ReactElement
//   className?: string
//   type?: string
// }

// type Props = ButtonProps | React.InputHTMLAttributes<HTMLButtonElement>
//
// const Button = ({ children }: Props, props: any): ReactElement => {
//   return <button {...props}>as{children}</button>
// }
//
// export default Button
