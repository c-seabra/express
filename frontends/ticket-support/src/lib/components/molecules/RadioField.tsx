import { ErrorMessage, Field } from 'formik';
import React, { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

const FieldContainer = styled.div`
  display: flex;
`;

const RadioContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: 11px;
`;

const LabelFieldContainer = styled.label`
  position: relative;
  display: flex;
  cursor: pointer;
`;

const Label = styled.div<{ required?: boolean }>`
  color: #091a46;
  font-size: 1rem;
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

const Error = styled.div`
  color: #e15554;
  font-size: 12px;
  margin-top: 4px;
`;
type RadioFieldProps = HTMLProps<HTMLInputElement> & { name: string };

const RadioField = ({
  className,
  label,
  name,
  required,
  value,
  disabled,
}: RadioFieldProps) => {
  return (
    <FieldContainer>
      <RadioContainer className={className}>
        <LabelFieldContainer>
          <Field
            disabled={disabled}
            name={name}
            required={required}
            type="radio"
            value={value}
          />
          {label && <Label required={required}>{label}</Label>}
          <ErrorMessage name={name}>
            {(message) => <Error>{message}</Error>}
          </ErrorMessage>
        </LabelFieldContainer>
      </RadioContainer>
    </FieldContainer>
  );
};

export default RadioField;
