/**
 * Initial work for ToggleField component (WiP)
 */

import { Field, FieldProps } from 'formik';
import React, { HTMLProps } from 'react';
import styled from 'styled-components';

const FieldContainer = styled.div`
  display: flex;
`;

const ToggleContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const ToggleInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  &:checked + label {
    background: rgba(0, 103, 233, 0.2);
  }

  input:checked + label:after {
    left: calc(100%);
    transform: translateX(-100%);
  }
`;

const LabelFieldContainer = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 44px;
  height: 20px;
  background: #d3d4d6;
  display: block;
  border-radius: 20px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: -2.5px;
    left: -2.5px;
    width: 24px;
    height: 24px;
    background: #0067e9;
    border-radius: 24px;
    transition: 0.3s;
  }

  &:active:after {
    width: 44px;
  }

  input:checked + label {
    background: rgba(0, 103, 233, 0.2);
  }

  input:checked + label:after {
    left: calc(100%);
    transform: translateX(-100%);
  }
`;

type ToggleFieldProps = HTMLProps<HTMLInputElement> & { name: string };

const ToggleField = ({
  className,
  name,
  required,
  disabled = false,
}: ToggleFieldProps) => {
  return (
    <FieldContainer>
      <ToggleContainer className={className}>
        <LabelFieldContainer>
          <Field disabled={disabled} name={name} required={required}>
            {({ field }: FieldProps) => (
              <>
                <ToggleInput type="checkbox" {...field} />
              </>
            )}
          </Field>

          {/* <ToggleInput id="switch" type="checkbox" /> */}
          {/* <LabelFieldContainer htmlFor="switch">Toggle</LabelFieldContainer> */}
        </LabelFieldContainer>
      </ToggleContainer>
    </FieldContainer>
  );
};

export default ToggleField;
