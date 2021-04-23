import React, { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

export type GroupCheckedState = 'none' | 'some' | 'all';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: 11px;
`;

const FieldContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  display: none;
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const indicatorMixin = css`
  width: 1.2em;
  height: 1.2em;
  background: #fff;
  position: absolute;
  top: -8px;
  left: -1.6em;
  transition: background-color 0.3s ease-out;

  border-radius: 0.2em;
  &:disabled {
    cursor: not-allowed;
  }
`;

const Indicator = styled.div<{
  color?: string;
  isChecked?: boolean;
  isError?: boolean;
}>`
  ${indicatorMixin};
  border: 1px solid ${(props) => (props.isError ? '#e15554' : '#dcdfe5')};

  ${(props) =>
    props.isChecked &&
    css`
      background-color: ${props.color ? props.color : '#0067e9'};
    `};

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
`;

const checkmark = css`
  display: block;
  top: 0;
  left: 0.4em;
  width: 25%;
  height: 65%;
  border: solid #fff;
  border-width: 0 0.2em 0.2em 0;
  transform: rotate(45deg);
`;

const dash = css`
  display: block;
  top: 0;
  left: 0.2em;
  width: 61%;
  height: 42%;
  border: solid #fff;
  border-width: 0 0 0.2em;
`;

const getIndicatorForState = (state: GroupCheckedState) => {
  switch (state) {
    case 'all':
      return checkmark;
    case 'some':
      return dash;
    case 'none':
    default:
      return '';
  }
};

const ThreeStateIndicator = styled.div<{
  isError?: boolean;
  state: GroupCheckedState;
}>`
  ${indicatorMixin};
  border: 1px solid ${(props) => (props.isError ? '#e15554' : '#dcdfe5')};

  ${(props) =>
    props.state !== 'none' &&
    css`
      background-color: ${props.color ? props.color : '#0067e9'};
    `};

  &::after {
    content: '';
    position: absolute;
    display: none;
  }

  &::after {
    ${(props) => getIndicatorForState(props.state)}
  }
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
  margin-top: -5px;

  ${(props) =>
    props.required &&
    css`
      &:after {
        color: #e15554;
        content: '*';
      }
    `}
`;

type CheckboxProps = Pick<
  HTMLProps<HTMLInputElement>,
  'className' | 'onChange' | 'checked' | 'required' | 'label'
> & {
  isError?: boolean;
};

const Checkbox = ({
  className,
  onChange,
  checked,
  isError = false,
  required = false,
  label,
}: CheckboxProps) => {
  return (
    <FieldContainer>
      <CheckboxContainer
        className={className}
        onClick={(event) => event.stopPropagation()}
      >
        <LabelFieldContainer>
          {label && <Label required={required}>{label}</Label>}
          <Input checked={checked} type="checkbox" onChange={onChange} />
          <Indicator isChecked={checked} isError={isError} />
        </LabelFieldContainer>
      </CheckboxContainer>
    </FieldContainer>
  );
};

type GroupIndicatorProps = {
  checkedStatus: GroupCheckedState;
  onClick?: () => void;
};

const GroupIndicator = ({ checkedStatus, onClick }: GroupIndicatorProps) => {
  return (
    <CheckboxContainer onClick={onClick}>
      <LabelFieldContainer>
        <ThreeStateIndicator state={checkedStatus} />
      </LabelFieldContainer>
    </CheckboxContainer>
  );
};

Checkbox.GroupIndicator = GroupIndicator;

export default Checkbox;
