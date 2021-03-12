import React, { Reducer, useReducer } from 'react';

import Checkbox, { GroupCheckedState } from '../atoms/Checkbox';
import Table, { ColumnDescriptor, TableProps } from './Table';

type Actions = 'SELECT' | 'DESELECT' | 'SELECT_ALL' | 'DESELECT_ALL';

type Selectable<T> = T & { selected?: boolean };

type SelectableReducerAction<T> = {
  item?: Selectable<T>;
  type: Actions;
};

type SelectableTableState<T> = {
  items: Selectable<T>[];
  selected: GroupCheckedState;
};

const checkItemsSelectionStatus = (items: Selectable<any>[] = []) => {
  const selectedItems = items.filter((item) => item.selected);

  if (selectedItems.length === items.length) {
    return 'all';
  }

  if (selectedItems.length === 0) {
    return 'none';
  }

  return 'some';
};

type OnSelect<T> = (
  selectedItem?: T,
  selected?: boolean,
  selectedItems?: T[],
) => void;
type OnSelectAll<T> = (selectedItems: T[], selected: boolean) => void;

const selectableTableReducer = <T extends unknown & { id: string | null }>(
  onSelect: OnSelect<T>,
  onSelectAll: OnSelectAll<T>,
): Reducer<SelectableTableState<T>, SelectableReducerAction<T>> => (
  { items, selected }: SelectableTableState<T>,
  { item, type }: SelectableReducerAction<T>,
) => {
  switch (type) {
    case 'SELECT': {
      const newItems = items.map((i) => {
        if (i.id === item?.id) {
          return {
            ...i,
            selected: true,
          };
        }

        return i;
      });
      onSelect(
        item,
        true,
        newItems.filter((i) => i.selected),
      );

      return {
        items: newItems,
        selected: checkItemsSelectionStatus(newItems),
      };
    }
    case 'DESELECT': {
      const newItems = items.map((i) => {
        if (i.id === item?.id) {
          return {
            ...i,
            selected: false,
          };
        }

        return i;
      });
      onSelect(
        item,
        false,
        newItems.filter((i) => i.selected),
      );

      return {
        items: newItems,
        selected: checkItemsSelectionStatus(newItems),
      };
    }
    case 'SELECT_ALL':
      onSelectAll(items, true);

      return {
        items: items.map((i) => ({ ...i, selected: true })),
        selected: 'all',
      };
    case 'DESELECT_ALL':
      onSelectAll([], false);

      return {
        items: items.map((i) => ({ ...i, selected: false })),
        selected: 'none',
      };
    default:
      return { items, selected };
  }
};

const checkboxColumn = <T extends unknown>(
  actions: {
    deselect: (item: Selectable<T>) => void;
    deselectAll: () => void;
    select: (item: Selectable<T>) => void;
    selectAll: () => void;
  },
  selected: GroupCheckedState,
): ColumnDescriptor<Selectable<T & { id: string | null }>> => ({
  header: (
    <Checkbox.GroupIndicator
      checkedStatus={selected}
      onClick={selected === 'none' ? actions.selectAll : actions.deselectAll}
    />
  ),
  renderCell: (item) => (
    <Checkbox
      checked={item.selected}
      onChange={() =>
        item.selected ? actions.deselect(item) : actions.select(item)
      }
    />
  ),
  width: 'none',
});

type SelectableTableProps<T> = TableProps<T> & {
  onSelect: OnSelect<T>;
  onSelectAll: OnSelectAll<T>;
};

const SelectableTable = <
  T extends unknown & { id: string | null; selected?: boolean }
>({
  tableShape,
  onSelect,
  onSelectAll,
  items = [],
  ...tableProps
}: SelectableTableProps<T>) => {
  const [state, dispatch] = useReducer(
    selectableTableReducer<T>(onSelect, onSelectAll),
    {
      items,
      selected: 'none',
    },
  );

  const actions = {
    deselect: (item: T) =>
      dispatch({
        item,
        type: 'DESELECT',
      }),
    deselectAll: () => dispatch({ type: 'DESELECT_ALL' }),
    select: (item: T) => dispatch({ item, type: 'SELECT' }),
    selectAll: () => dispatch({ type: 'SELECT_ALL' }),
  };

  const checkboxColumnShape = checkboxColumn(actions, state.selected);

  return (
    <Table<Selectable<T>>
      {...tableProps}
      items={state.items}
      tableShape={[checkboxColumnShape, ...tableShape]}
    />
  );
};

export default SelectableTable;
