import React from 'react'
import styled from 'styled-components'

import { Input, Label } from '..'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;

  & > span {
    margin-bottom: 4px;
  }
`

type LabeledInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const LabeledInput = ({ label, ...props }: LabeledInputProps) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input {...props} />
    </InputContainer>
  )
}

export default LabeledInput
