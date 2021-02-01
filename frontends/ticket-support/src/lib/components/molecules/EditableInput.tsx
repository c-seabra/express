import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

import Icon from '../atoms/Icon'

const EditInput = styled.div<{ disabled: boolean }>`
  display: flex;
  border: 1px solid #dcdfe5;
  border-radius: 2px;
  font-size: 16px;
  padding: 10px 14px;

  input {
    flex: 1;
    font-weight: 300;
    background-color: #fff;
    border: none;
    color: ${props => (props.disabled ? 'rgba(#07143e, 0.5)' : '#07143e')};
    font-size: 16px;
    letter-spacing: 0;
    line-height: 20px;
    
    &:focus {
      outline: none;
    }
  }
`

const StyledActions = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const IconWrapper = styled.span`
  color: #0067e9;
  margin-right: 12px;
  height: 18px;

  .material-icons {
    font-size: 16px;
  }
`

const StyledActionsText = styled.span`
  color: #0067e9;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24px;
`

type EditableInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { className?: string }

const EditableInput = ({
  className,
  defaultValue,
  placeholder,
  value,
  disabled,
  onChange,
  onKeyDown,
  ...props
}: EditableInputProps) => {
  const onEdit = () => {
    console.log('editeee')
  }
  return (
    <EditInput className={className} disabled={disabled}>
      <input
        {...{
          defaultValue,
          onChange,
          onKeyDown,
          placeholder,
          value,
        }}
        {...props}
      />
      <StyledActions onClick={onEdit}>
        <IconWrapper>
          <Icon>mode</Icon>
        </IconWrapper>
        <StyledActionsText>Edit</StyledActionsText>
      </StyledActions>
    </EditInput>
  )
}

export default EditableInput
