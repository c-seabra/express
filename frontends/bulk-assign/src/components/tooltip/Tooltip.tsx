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
  border-bottom-right-radius: 0;
  padding: .5rem;
  font-size: 1em;
  position: absolute;
  z-index: 1;
  bottom: -1px;
  right: 100%;
  opacity: 0;
  transition: opacity 0.3s;
`
const StyledTooltip = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  padding: 5px 5px 0;
  &:hover {
    background: rgb(85, 85, 85);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: all 0.3s;
    svg {
      path {
        fill: #fff;
      }
    }
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
