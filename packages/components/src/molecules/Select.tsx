import React from 'react';
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

const StyledSelect = styled.select<{ isError?: boolean }>`
  font-size: 16px;
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

export type SelectFieldOption = {
  disabled?: boolean;
  label?: string | number;
  value?: string | number;
};

type SelectFieldProps = {
  className?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  onChange?: (event: any) => void;
  options?: SelectFieldOption[];
  placeholder?: string;
  required?: boolean;
  value?: string | number;
};

const Select = ({
  className,
  label,
  placeholder,
  options = [],
  required = false,
  disabled = false,
  onChange = undefined,
  value,
  error,
}: SelectFieldProps) => {
  return (
    <FieldContainer className={className}>
      {label && <Label required={required}>{label}</Label>}
      <StyledSelect
        disabled={disabled}
        isError={!!error}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            key={option.value}
            disabled={option.disabled}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </StyledSelect>

      {error && <Error>{error}</Error>}
    </FieldContainer>
  );
};

export default Select;
