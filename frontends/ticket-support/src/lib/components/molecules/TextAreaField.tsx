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

const StyledTextarea = styled.textarea<{ fieldHeight?: string; isError?: boolean }>`
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
  resize: none;

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

const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
`

const LengthCounter = styled.div`
  font-size: 0.8rem;
  color: #07143e;
  opacity: 0.5;
  position: absolute;
  right: 8px;
  bottom: 8px;
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
  maxLength,
}: TextInputFieldProps) => {
  return (
    <FieldContainer className={className}>
      {label && <Label required={required}>{label}</Label>}
      <Field name={name} required={required}>
        {({ meta, field }: FieldProps<string>) => (
          <TextAreaContainer>
            <StyledTextarea
              fieldHeight={fieldHeight}
              isError={meta.touched && !!meta.error}
              maxLength={maxLength}
              {...field}
              placeholder={placeholder}
            />
            {maxLength && field?.value && (
              <LengthCounter>
                {field.value.length}/{maxLength}
              </LengthCounter>
            )}
          </TextAreaContainer>
        )}
      </Field>
      <ErrorMessage name={name} render={message => <Error>{message}</Error>} />
    </FieldContainer>
  )
}

export default TextAreaField
