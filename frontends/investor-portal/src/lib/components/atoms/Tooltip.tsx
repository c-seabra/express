import React, { ReactNode } from 'react'
import styled from 'styled-components'

const TooltipIndicator = styled.span`
  opacity: 0;
  position: absolute;
  left: -9999px;
  transition: opacity 0.2s ease;
`

const StyledTooltip = styled.span`
  position: relative;
  ${TooltipIndicator} {
    opacity: 0;
    position: absolute;
    left: -9999px;
    transition: opacity 0.2s ease;
  }
  &:hover {
    cursor: pointer;
    ${TooltipIndicator} {
      opacity: 1;
      left: 0;
      bottom: 110%;
      min-width: 70px;
      max-width: 250px;
      width: auto;
      font-size: 0.725rem;
      background: grey;
      color: white;
      padding: 0.25rem;
      border-radius: 4px;
      text-align: center;
    }
  }
`
type TooltipProps = {
  children?: ReactNode
  content?: string
  copyToClip?: boolean
  value?: string
}

export const Tooltip = ({
  copyToClip = true,
  content = 'Click to copy',
  value = '',
  children,
}: TooltipProps) => {
  const copyToClipBoard = (copyMe: string) => {
    const textField = document.createElement('textarea')
    textField.innerText = copyMe
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  return (
    <StyledTooltip onClick={copyToClip ? () => copyToClipBoard(value) : () => null}>
      {children}
      <TooltipIndicator>{content}</TooltipIndicator>
    </StyledTooltip>
  )
}
