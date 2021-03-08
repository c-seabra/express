import React, { SetStateAction } from 'react';
import styled from 'styled-components';

const StyledField = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 1rem;
  margin-bottom: 0.5rem;
  input {
    cursor: pointer;
  }
  span {
    margin-bottom: 0.5rem;
  }
`;

const Field = ({
  label,
  fieldName,
  fieldType = 'text',
  onChange,
  readOnly = false,
  required = false,
  value = undefined,
}: {
  fieldName: string;
  fieldType?: string;
  label?: string;
  onChange: (val: string) => void;
  readOnly?: boolean;
  required?: boolean;
  value?: string | undefined;
}) => {
  return (
    <StyledField>
      <span>
        {label}
        {required && '*'}
      </span>
      <input
        name={fieldName}
        readOnly={readOnly}
        required={required}
        type={fieldType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </StyledField>
  );
};

export default Field;
