import React from 'react';

import { ListColumn } from '../atoms';
import ListHeaderItem from './ItemListHeader.styled';

type ItemListHeaderProps = {
  columns: string[];
};

const ItemListHeader = ({ columns }: ItemListHeaderProps) => {
  return (
    <ListHeaderItem>
      {columns.map((column) => (
        <ListColumn key={column} columnCount={columns.length}>
          {column}
        </ListColumn>
      ))}
    </ListHeaderItem>
  );
};

export default ItemListHeader;
