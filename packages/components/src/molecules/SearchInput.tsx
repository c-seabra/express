import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import SearchIcon from '../svgs/SearchIcon';

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;

  select {
    height: 2rem;
    width: 100%;
  }
`;

export const Search = styled(StyledLabel)`
  width: 30%;
  position: relative;

  svg {
    width: auto;
    height: 60%;
    position: absolute;
    left: 0.5rem;
    top: 25%;
    opacity: 50%;
  }

  input {
    border: 1px solid #dcdfe5;
    border-radius: 4px;
    font-weight: 300;
    font-family: inherit;
    font-size: 0.75rem;
    line-height: 1;
    height: auto;
    max-width: 100%;
    padding: 0.5rem 1.5rem 0.5rem 1.75rem;
    margin: 0;
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
