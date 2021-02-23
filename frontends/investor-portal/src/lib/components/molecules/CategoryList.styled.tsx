import styled from 'styled-components';

export const CategoryListContainer = styled.div<{ headerColor?: string }>`
  display: flex;
  flex-direction: column;
  font-size: 14px;

  & > button {
    text-align: left;
    border: none;
    background-color: #f7f7f7;
    margin-bottom: 0.2rem;
    padding: 0.2rem 0.5rem;

    &[data-is-selected='true'] {
      background-color: #dcdfe5;
    }

    &:hover {
      cursor: pointer;
      background-color: #dcdfe5;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Header = styled.div<{ headerColor?: string }>`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: #fff;

  background-color: ${(props) => props.headerColor};
  margin-bottom: 0.2rem;
  padding: 0.2rem 0.5rem;
  font-weight: 600;
`;
