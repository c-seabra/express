import { ErrorMessage, Field, FieldProps, useFormikContext } from 'formik';
import React, { HTMLProps } from 'react';
import CurrencyInput from 'react-currency-input-field';
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

const StyledInput = styled.input`
  font-size: 14px;
  font-weight: 300;
  border: 1px solid #dcdfe5;
  border-radius: 2px;
  min-height: 40px;
  padding-left: 1rem;
  box-sizing: border-box;
  width: 100%;
  color: #07143e;
`;

const StyledErrorInput = styled(StyledInput)`
  border: 1px solid #e15554;
`;

const Error = styled.div`
  color: #e15554;
  font-size: 12px;
  margin-top: 4px;
`;

type MoneyInputFieldProps = HTMLProps<HTMLInputElement> & {
  currencySymbol?: string | null;
  name: string;
};

const MoneyInputField = ({
  className,
  label,
  name,
  required,
  currencySymbol = '',
  placeholder,
  disabled,
}: MoneyInputFieldProps) => {
  const { setFieldValue } = useFormikContext();
  return (
    <FieldContainer className={className}>
      {label && <Label required={required}>{label}</Label>}
      <Field name={name} required={required}>
        {({ meta, field }: FieldProps<number>) => (
          <CurrencyInput
            customInput={meta.error ? StyledErrorInput : StyledInput}
            defaultValue={field.value || 0}
            disabled={disabled}
            name={field.name}
            placeholder={placeholder}
            prefix={currencySymbol || ''}
            onValueChange={(value) => {
              setFieldValue(name, value);
            }}
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

export default MoneyInputField;
