/**
 * Button - atom
 *
 * Types
 *  Primary, Secondary
 *
 * States
 *  disabled, hovered
 */

import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  min-width: 75px;
  padding: 0 32px;
  border-radius: 3px;
  border: 1px solid #0067e9;
  letter-spacing: 0;
  transition: all 0.3s ease-out;
  line-height: 24px;
  height: 36px;

  cursor: pointer;

  color: #ffffff;
  background-color: #0067e9;

  &:hover {
    border: 1px solid #2269bf;
    background-color: #2269bf;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #cccccc;
    color: #888888;
    border-color: #c1c5c9;
    cursor: not-allowed;
    pointer-events: none;
  }

  + button {
    margin-left: 1rem;
  }
`;

export const SecondaryButton = styled(Button)`
  color: #0067e9;
  background-color: #ffffff;

  &:hover {
    background-color: #2269bf;
    color: #ffffff;
  }
`;

export const ErrorButton = styled(Button)`
  background-color: #e15554;
  border: 1px solid #e15554;

  &:hover {
    background-color: #de201f;
    border: 1px solid #de201f;
  }
`;

export const DisabledButton = styled(Button)`
  background-color: #949494;
  border: 1px solid #949494;

  &:hover {
    background-color: #6b6b6b;
    border: 1px solid #6b6b6b;
  }
`;

export const TextButton = styled(SecondaryButton)`
  border: none;
  background-color: white;
  padding: 0;

  &:hover {
    background-color: white;
    color: #2269bf;
    border: none;
  }
`;

export const UnstyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const DestructiveButton = styled(Button)`
  color: #cb1977;
  background-color: #ffffff;
  border: 1px solid #cb1977;

  &:hover {
    background-color: #cb1977;
    color: #ffffff;
  }
`;

type ButtonProps = {
  children: ReactNode;
  classNames: Array<string>;
  disabled: boolean;
  onClick: () => void;
  type: string;
};

const ButtonComponent = ({
  type,
  children,
  onClick,
  classNames,
  ...props
}: ButtonProps): ReactElement => {
  classNames.push('ws-btn');

  if (props.disabled) {
    classNames.push('disabled');
  }

  const classes: string = classNames.join(' ');

  let element = (
    <Button className={classes} onClick={onClick} {...props}>
      {children}
    </Button>
  );

  if (type === 'secondary') {
    element = (
      <SecondaryButton className={classes} onClick={onClick} {...props}>
        {children}
      </SecondaryButton>
    );
  }

  if (type === 'error') {
    element = (
      <ErrorButton className={classes} onClick={onClick} {...props}>
        {children}
      </ErrorButton>
    );
  }

  if (type === 'destructive') {
    element = (
      <DestructiveButton className={classes} onClick={onClick} {...props}>
        {children}
      </DestructiveButton>
    );
  }

  if (type === 'text') {
    element = (
      <TextButton className={classes} onClick={onClick} {...props}>
        {children}
      </TextButton>
    );
  }

  if (type === 'disabled') {
    element = (
      <DisabledButton className={classes} onClick={onClick} {...props}>
        {children}
      </DisabledButton>
    );
  }

  return element;
};

ButtonComponent.defaultProps = {
  classNames: [],
  disabled: false,
  onClick: () => null,
  type: 'primary',
};

export default ButtonComponent;
