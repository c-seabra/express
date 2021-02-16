/**
 * Button - atom
 *
 * Types
 *  Primary, Secondary
 *
 * States
 *  disabled, hovered
 */

import styled from 'styled-components'

export const Button = styled.button`
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  min-width: 75px;
  padding: 0 32px;
  border-radius: 3px;
  border: 1px solid #0067e9;
  letter-spacing: 0;
  transition: all 0.3s ease-out;
  line-height: 24px;
  height: 36px;

  cursor: pointer;

  color: #ffffff;
  background-color: #0067e9;

  &:hover {
    border: 1px solid #2269bf;
    background-color: #2269bf;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #cccccc;
    color: #888888;
    border-color: #c1c5c9;
    cursor: not-allowed;
    pointer-events: none;
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

export const DestructiveButton = styled(Button)`
  color: #cb1977;
  background-color: #ffffff;
  border: 1px solid #cb1977;

  &:hover {
    background-color: #cb1977;
    color: #ffffff;
  }
`
export default Button
