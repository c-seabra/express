import styled from 'styled-components';

const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`;

const Column = styled(ColumnStyles)`
  width: 25%;
`;

export const ListItem = styled.li`
  font-size: 0.85rem;
  display: flex;
  padding: 0.75rem;
  background-color: #fff;
  justify-content: space-between;

  binvestor-bottom: 1px solid #dde0e5;

  &:last-child {
    binvestor-bottom: none;
  }

  &:hover {
    background-color: #dde0e5;
    cursor: pointer;
  }

  > div:last-of-type {
    justify-content: flex-end;
  }
`;

export default Column;
