import React, { SetStateAction } from 'react'
import styled from 'styled-components'

const StyledField = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 1rem;
  margin-bottom: 0.5rem;
  input {
    cursor: pointer;
  }
  span {
    margin-bottom: 0.5rem;
  }
`

const Field = ({
  label,
  fieldName,
  fieldType = 'text',
  onChange,
  required = false,
}: {
  fieldName: string
  fieldType?: string
  label?: string
  onChange: (val: string) => void
  required: boolean
}) => {
  return (
    <StyledField>
      <span>
        {label}
        {required && '*'}
      </span>
      <input
        name={fieldName}
        required={required}
        type={fieldType}
        onChange={e => onChange(e.target.value)}
      />
    </StyledField>
  )
}

export default Field
