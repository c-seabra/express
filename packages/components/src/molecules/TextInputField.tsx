import { ErrorMessage, Field, FieldProps } from 'formik';
import { FieldValidator } from 'formik/dist/types';
import React, { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 85px;
`;

const Label = styled.div<{ required?: boolean }>`
  color: #091a46;
  font-size: 14px;
  margin-bottom: 4px;

  ${(props) =>
    props.required &&
    css`
      &:after {
        color: #e15554;
        content: '*';
      }
    `}
`;

const StyledInput = styled.input<{ isError?: boolean }>`
  font-size: 14px;
  font-weight: 300;
  border: 1px solid ${(props) => (props.isError ? '#e15554' : '#dcdfe5')};
  border-radius: 2px;
  min-height: 40px;
  padding-left: 1rem;
  box-sizing: border-box;
  width: 100%;
  color: #07143e;

  &:disabled {
    background-color: rgba(239, 239, 239, 0.3);
  }
`;

const Error = styled.div`
  color: #e15554;
  font-size: 12px;
  margin-top: 4px;
`;

type TextInputFieldProps = HTMLProps<HTMLInputElement> & {
  name: string;
  validate?: FieldValidator;
};

const TextInputField = ({
  className,
  label,
  name,
  required,
  placeholder,
  type = 'text',
  disabled,
  validate,
  maxLength,
}: TextInputFieldProps) => {
  return (
    <FieldContainer className={className}>
      {label && <Label required={required}>{label}</Label>}
      <Field name={name} required={required} validate={validate}>
        {({ meta, field }: FieldProps) => (
          <StyledInput
            disabled={disabled}
            isError={meta.touched && !!meta.error}
            maxLength={maxLength}
            type={type}
            {...field}
            placeholder={placeholder}
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        render={(message) => <Error>{message}</Error>}
      />
    </FieldContainer>
  );
};

export default TextInputField;
