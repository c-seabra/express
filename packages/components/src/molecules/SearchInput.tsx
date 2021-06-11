import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import SearchIcon from '../svgs/SearchIcon';

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;

  select,
  input {
    height: 2rem;
    width: 100%;
  }
`;

export const Search = styled(StyledLabel)`

  width: 30%;
  position: relative;

  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    opacity: 50%;
  }

  input {
    border: 1px solid #dcdfe5;
    border-radius: 4px;
    font-weight: 300;
    font-family: inherit;
    font-size: 1.5rem;
    line-height: 1;
    height: auto;
    max-width: 100%;
    padding: 0.75rem 0.375em 0.8rem 3.5rem;
    margin: 0;
  }
`;

type SearchInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement> & { className?: string };

const SearchInput = ({
                       className,
                       defaultValue,
                       placeholder,
                       value,
                       onChange,
                       onKeyDown,
                       ...props
                     }: SearchInputProps) => {
  return (
    <Search className={className}>
      <SearchIcon />
      <input
        {...{
          defaultValue,
          onChange,
          onKeyDown,
          placeholder,
          value,
        }}
        {...props}
      />
    </Search>
  );
};

export default SearchInput;
