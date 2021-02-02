import { ErrorMessage, Field, FieldProps } from 'formik'
import React, { HTMLProps } from 'react'
import styled, { css } from 'styled-components'

import Icon from '../atoms/Icon'

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 85px;
`

const Label = styled.div<{ required?: boolean }>`
  color: #091a46;
  font-size: 14px;
  margin-bottom: 4px;

  ${props =>
    props.required &&
    css`
      &:after {
        color: #e15554;
        content: '*';
      }
    `}
`

const InputContainer = styled.div<{ editModeOn?: boolean }>`
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
    color: ${props => (props.editModeOn ? 'rgba(7, 20, 62, 0.5)' : '#07143e')};
    font-size: 16px;
    letter-spacing: 0;
    line-height: 20px;

    &:focus {
      outline: none;
    }
  }
`

const StyledInput = styled.input<{ isError?: boolean }>`
  font-size: 14px;
  font-weight: 300;
  border: 1px solid ${props => (props.isError ? '#e15554' : '#dcdfe5')};
  border-radius: 4px;
  min-height: 40px;
  padding-left: 1rem;
  box-sizing: border-box;
  width: 100%;
  color: #07143e;
`

const Error = styled.div`
  color: #e15554;
  font-size: 12px;
  margin-top: 4px;
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

type TextInputFieldProps = HTMLProps<HTMLInputElement> & {
  editModeOn?: boolean
  name: string
  onEdit?(): void
}

const TextInputField = ({
  className,
  label,
  name,
  required,
  placeholder,
  editModeOn = false,
  onEdit,
  disabled,
}: TextInputFieldProps) => {
  return (
    <FieldContainer className={className}>
      {label && <Label required={required}>{label}</Label>}
      <InputContainer editModeOn={(onEdit && !editModeOn) || disabled}>
        <Field name={name} required={required}>
          {({ meta, field }: FieldProps) => (
            <StyledInput
              isError={meta.touched && !!meta.error}
              type="text"
              {...field}
              disabled={(onEdit && !editModeOn) || disabled}
              placeholder={placeholder}
            />
          )}
        </Field>
        {onEdit && !editModeOn && (
          <StyledActions onClick={onEdit}>
            <IconWrapper>
              <Icon>mode</Icon>
            </IconWrapper>
            <StyledActionsText>Edit</StyledActionsText>
          </StyledActions>
        )}
      </InputContainer>
      <ErrorMessage name={name} render={message => <Error>{message}</Error>} />
    </FieldContainer>
  )
}

export default TextInputField
