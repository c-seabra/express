import React from 'react';
import styled from 'styled-components';

const StyledFileInput = styled.input`
  display: flex;

  &::-webkit-file-upload-button {
    visibility: hidden;
  }

  &::before {
    content: 'Choose file';
    display: inline-block;
    background-color: #0067e9;
    border-radius: 2px;
    padding: 0.5rem 0.5rem;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 400;
    align-items: center;
    color: #ffffff;
  }

  &:hover::before {
    border-color: black;
  }
`;

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const FileInput = ({ ...props }: Props) => {
  return <StyledFileInput {...props} />;
};

export default FileInput;
