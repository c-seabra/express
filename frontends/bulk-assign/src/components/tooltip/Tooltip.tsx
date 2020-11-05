import React from 'react'
import styled from 'styled-components'

const TooltipText = styled.div`
  visibility: hidden;
  width: 250px;
  height: auto;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: .5rem;
  font-size: .85rem;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`
const StyledTooltip = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  &:hover {
    ${TooltipText} {
      visibility: visible;
      opacity: 1;
    }
  }
`

const Tooltip: React.FC<{children: React.ReactElement; tooltipText: string}> = ({children, tooltipText}) => {


  return (
    <StyledTooltip>
      {children}
      <TooltipText>
        {tooltipText}
      </TooltipText>
    </StyledTooltip>
  )
}

export default Tooltip
