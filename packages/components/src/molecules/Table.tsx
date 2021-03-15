import React, { ReactElement, ReactNode, useCallback } from 'react';
import styled, { css } from 'styled-components';

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
  ${(props) =>
    props.width
      ? css`
          width: ${props.width};
        `
      : css`
          width: 15%;
        `}
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

const StyledFooter = styled(StyledListItem)`
  &:hover {
    background-color: transparent;
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
  headers: { header: string; width?: string }[];
}): ReactElement => {
  return (
    <ListHeaderItem>
      {headers.map(({ header, width }) => (
        <Column key={header} width={width}>
          {header}
        </Column>
      ))}
    </ListHeaderItem>
  );
};

export type ColumnDescriptor<T> = {
  header: string;
  renderCell: (item: T) => string | number | ReactNode;
  width?: string;
};

type TableProps<T> = {
  items?: T[];
  onRowClick?: (item: T) => void;
  renderFooter?: () => ReactNode;
  tableShape: ColumnDescriptor<T>[];
};

const Table = <T extends unknown & { id: string | null }>({
  tableShape = [],
  items = [],
  onRowClick = () => null,
  renderFooter,
}: TableProps<T>): ReactElement => {
  const renderTableRow = useCallback(
    (item: typeof items[0]) =>
      tableShape.map((columnShape) => (
        <Column
          key={`${columnShape?.header}-${item.id || ''}`}
          width={columnShape.width}
        >
          {columnShape.renderCell(item)}
        </Column>
      )),
    [tableShape],
  );

  return (
    <StyledContainer>
      <TableHeader
        headers={tableShape.map(({ header, width }) => ({ header, width }))}
      />
      {items.map((item) => (
        <StyledListItem key={item.id} onClick={() => onRowClick(item)}>
          {renderTableRow(item)}
        </StyledListItem>
      ))}
      {renderFooter && (
        <StyledFooter key="table-footer">{renderFooter()}</StyledFooter>
      )}
    </StyledContainer>
  );
};

export default Table;
