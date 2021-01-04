import React from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
  font-size: 16px;
`
const StyledAsterix = styled.span`
  color: #f00;
  font-size: 16px;
  font-weight: 500;

  margin-left: 4px;
`

type Props = React.InputHTMLAttributes<HTMLLabelElement> & {
  withAsterix?: boolean
}

export const Label = ({ withAsterix = false, ...props }: Props) => {
  return (
    <span>
      <StyledLabel {...props} />
      {withAsterix && <StyledAsterix>*</StyledAsterix>}
    </span>
  )
}
