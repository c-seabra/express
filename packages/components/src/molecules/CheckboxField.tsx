import { ErrorMessage, Field, FieldProps } from 'formik';
import React, { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

const FieldContainer = styled.div`
  display: flex;
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: 11px;
`;

const Input = styled.input`
  display: none;
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const LabelFieldContainer = styled.label`
  position: relative;
  display: inline-block;
  margin: 0.6em 1em;
  cursor: pointer;
  font-weight: 400;
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

const Indicator = styled.div<{
  color?: string;
  isChecked?: boolean;
  isError?: boolean;
}>`
  width: 1.2em;
  height: 1.2em;
  background: #fff;
  position: absolute;
  top: -2px;
  left: -1.6em;
  border: 1px solid ${(props) => (props.isError ? '#e15554' : '#dcdfe5')};
  transition: background-color 0.3s ease-out;

  border-radius: 0.2em;

  ${(props) =>
    props.isChecked &&
    css`
      background-color: ${props.color ? props.color : '#0067e9'};
    `};

  ${Label}:hover & {
    background-color: #0067e9;
  }

  &::after {
    content: '';
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    top: 0;
    left: 0.4em;
    width: 25%;
    height: 65%;
    border: solid #fff;
    border-width: 0 0.2em 0.2em 0;
    transform: rotate(45deg);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: #e15554;
  font-size: 12px;
  margin-top: 4px;
`;

type CheckboxFieldProps = HTMLProps<HTMLInputElement> & {
  color?: string;
  name: string;
};

const CheckboxField = ({
  color,
  className,
  label,
  name,
  required,
}: CheckboxFieldProps) => {
  return (
    <FieldContainer>
      <CheckboxContainer className={className}>
        <LabelFieldContainer>
          {label && <Label required={required}>{label}</Label>}
          <Field name={name} required={required}>
            {({ meta, field }: FieldProps) => (
              <>
                <Input type="checkbox" {...field} />
                <Indicator
                  color={color}
                  isChecked={!!meta.value}
                  isError={meta.touched && !!meta.error}
                />
              </>
            )}
          </Field>
          <ErrorMessage name={name}>
            {(message) => <Error>{message}</Error>}
          </ErrorMessage>
        </LabelFieldContainer>
      </CheckboxContainer>
    </FieldContainer>
  );
};

export default CheckboxField;
