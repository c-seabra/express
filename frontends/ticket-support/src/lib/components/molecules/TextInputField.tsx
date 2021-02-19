import { ErrorMessage, Field, FieldProps } from 'formik';
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
`;

const Error = styled.div`
  color: #e15554;
  font-size: 12px;
  margin-top: 4px;
`;

type TextInputFieldProps = HTMLProps<HTMLInputElement> & {
  name: string;
};

const TextInputField = ({
  className,
  label,
  name,
  required,
  placeholder,
}: TextInputFieldProps) => {
  return (
    <FieldContainer className={className}>
      {label && <Label required={required}>{label}</Label>}
      <Field name={name} required={required}>
        {({ meta, field }: FieldProps) => (
          <StyledInput
            isError={meta.touched && !!meta.error}
            type="text"
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
