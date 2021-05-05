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

type TextInputProps = HTMLProps<HTMLInputElement> & {
  errorMessage?: string;
};

const TextInput = ({
  className,
  label,
  required,
  placeholder,
  type = 'text',
  disabled,
  errorMessage,
  onChange,
  value,
  list,
}: TextInputProps) => {
  return (
    <FieldContainer className={className}>
      {label && <Label required={required}>{label}</Label>}
      <StyledInput
        disabled={disabled}
        list={list}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
      {errorMessage && <Error>{errorMessage}</Error>}
    </FieldContainer>
  );
};

export default TextInput;
