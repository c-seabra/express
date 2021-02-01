import React, { HTMLProps } from 'react'
import styled from 'styled-components'

import Icon from '../atoms/Icon'
import { Input } from '../atoms/Input'

const EditInput = styled.div<{ editModeOn?: boolean }>`
  display: flex;
  border: 1px solid #dcdfe5;
  border-radius: 2px;
  font-size: 16px;
  padding-right: 24px;

  input {
    flex: 1;
    font-weight: 300;
    background-color: #fff;
    border: none;
    color: ${props => (props.editModeOn ? 'rgba(#07143e, 0.5)' : '#07143e')};
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

type EditableInputProps = HTMLProps<HTMLInputElement> & {
  className?: string
  editModeOn?: boolean
  onEdit: void
}

const EditableInput = ({
  className,
  defaultValue,
  placeholder,
  value,
  editModeOn = false,
  onChange,
  onKeyDown,
  onEdit,
  ...props
}: EditableInputProps) => {
  return (
    <EditInput className={className} editMode={editModeOn}>
      <Input
        {...{
          placeholder,
          value,
        }}
        disabled={!editModeOn}
        {...props}
      />
      <StyledActions onClick={onEdit}>
        {!editModeOn && (
          <>
            <IconWrapper>
              <Icon>mode</Icon>
            </IconWrapper>
            <StyledActionsText>Edit</StyledActionsText>
          </>
        )}
      </StyledActions>
    </EditInput>
  )
}

export default EditableInput
