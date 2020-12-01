import React from 'react'
import styled from 'styled-components'

const StyledField = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 1rem;
  margin-bottom: .5rem;
  input {
    cursor: pointer;
  }
  span {
    margin-bottom: .5rem;
  }
`

const Field = ({
  label,
  fieldName,
  fieldType = 'text',
  onChange,
  required = false
}: {
  label?: string
  fieldName: string
  fieldType?: string
  onChange: (val:string | boolean) => void
  required: boolean
}) => {
  return (
    <StyledField>
      <span>{label}{required && '*'}</span>
      <input type={fieldType} name={fieldName} onChange={e => onChange(e.target.value)} required={required} />
    </StyledField>
  )
}

export default Field
