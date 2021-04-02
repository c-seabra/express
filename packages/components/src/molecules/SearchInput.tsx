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
    padding-left: 2rem;
    border: 1px solid #dcdfe5;
    border-radius: 4px;
    font-weight: 300;
  }
`;

type SearchInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
  > & { className?: string };

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
