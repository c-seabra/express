import { ErrorMessage, Field, FieldProps } from 'formik'
import React, { HTMLProps } from 'react'
import styled, { css } from 'styled-components'

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 85px;
  padding-bottom: 1.8rem;
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

const StyledInput = styled.textarea<{ fieldHeight?: string; isError?: boolean }>`
  font-size: 14px;
  font-weight: 300;
  border: 1px solid ${props => (props.isError ? '#e15554' : '#dcdfe5')};
  border-radius: 4px;
  min-height: 40px;
  padding-left: 1rem;
  padding-top: 1rem;
  box-sizing: border-box;
  width: 100%;
  color: #07143e;

  ${props =>
    props.fieldHeight &&
    css`
      height: ${props.fieldHeight};
    `};
`

const Error = styled.div`
  color: #e15554;
  font-size: 12px;
  margin-top: 4px;
`

type TextInputFieldProps = HTMLProps<HTMLInputElement> & {
  fieldHeight?: string
  name: string
}

const TextAreaField = ({
  className,
  label,
  name,
  required,
  placeholder,
  fieldHeight = '150px',
}: TextInputFieldProps) => {
  return (
    <FieldContainer className={className}>
      {label && <Label required={required}>{label}</Label>}
      <Field name={name} required={required}>
        {({ meta, field }: FieldProps) => (
          <StyledInput
            fieldHeight={fieldHeight}
            isError={meta.touched && !!meta.error}
            {...field}
            placeholder={placeholder}
          />
        )}
      </Field>
      <ErrorMessage name={name} render={message => <Error>{message}</Error>} />
    </FieldContainer>
  )
}

export default TextAreaField
