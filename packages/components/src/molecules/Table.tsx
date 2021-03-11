import React, { ReactElement, ReactNode, useCallback } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ColumnStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`;

const Column = styled(ColumnStyles)<{ width?: string }>`
  width: ${(props) => props.width || '15%'};
`;

const StyledListItem = styled.li`
  font-size: 0.85rem;
  display: flex;
  padding: 1rem 1.5rem;
  background-color: white;
  color: #0c1439;

  border-bottom: 1px solid #dde0e5;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #dde0e5;
  }
`;

const ListHeaderItem = styled(StyledListItem)`
  font-weight: 600;
  text-align: center;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`;

const TableHeader = ({
  headers = [],
}: {
  headers: { header: string | ReactNode; width?: string }[];
}): ReactElement => {
  return (
    <ListHeaderItem>
      {headers.map(({ header, width }, index) => (
        // Headers won't change as opposed to table items
        // eslint-disable-next-line react/no-array-index-key
        <Column key={index} width={width}>
          {header}
        </Column>
      ))}
    </ListHeaderItem>
  );
};

export type ColumnDescriptor<T> = {
  header: string | ReactNode;
  renderCell: (item: T, index?: number) => string | number | ReactNode;
  width?: string;
};

export type TableProps<T> = {
  items?: T[];
  onRowClick?: (item: T) => void;
  tableShape: ColumnDescriptor<T>[];
};

const Table = <T extends unknown & { id: string | null }>({
  tableShape = [],
  items = [],
  onRowClick = () => null,
}: TableProps<T>): ReactElement => {
  const renderTableRow = useCallback(
    (item: typeof items[0], index?: number) =>
      tableShape.map((columnShape) => (
        <Column key={`${item.id || ''}`} width={columnShape.width}>
          {columnShape.renderCell(item, index)}
        </Column>
      )),
    [tableShape],
  );

  return (
    <StyledContainer>
      <TableHeader
        headers={tableShape.map(({ header, width }) => ({ header, width }))}
      />
      {items.map((item, index) => (
        <StyledListItem key={item.id} onClick={() => onRowClick(item)}>
          {renderTableRow(item, index)}
        </StyledListItem>
      ))}
    </StyledContainer>
  );
};

export default Table;
