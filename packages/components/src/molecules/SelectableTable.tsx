import React, { Reducer, useEffect, useReducer } from 'react';

import Checkbox, { GroupCheckedState } from '../atoms/Checkbox';
import Table, { ColumnDescriptor, TableProps } from './Table';

type Actions =
  | 'SELECT'
  | 'DESELECT'
  | 'SELECT_ALL'
  | 'DESELECT_ALL'
  | 'LOAD_ITEMS';

type Selectable<T> = T & { selected?: boolean };

type SelectableReducerAction<T> = {
  item?: Selectable<T>;
  items?: Selectable<T>[];
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
  onSelectAll?: OnSelectAll<T>,
): Reducer<SelectableTableState<T>, SelectableReducerAction<T>> => (
  { items, selected }: SelectableTableState<T>,
  { item, type, items: loadedItems }: SelectableReducerAction<T>,
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
      if (onSelectAll) {
        onSelectAll(items, true);

        return {
          items: items.map((i) => ({ ...i, selected: true })),
          selected: 'all',
        };
      }

      return { items, selected };
    case 'DESELECT_ALL':
      if (onSelectAll) {
        onSelectAll([], false);

        return {
          items: items.map((i) => ({ ...i, selected: false })),
          selected: 'none',
        };
      }

      return { items, selected };
    case 'LOAD_ITEMS':
      return { items: loadedItems || [], selected };
    default:
      return { items, selected };
  }
};

type CheckboxColumnArgs<T> = {
  actions: {
    deselect: (item: Selectable<T>) => void;
    deselectAll: () => void;
    select: (item: Selectable<T>) => void;
    selectAll: () => void;
  };
  disableToggleAll?: boolean;
  header?: string;
  selected: GroupCheckedState;
};

const checkboxColumn = <T extends unknown>({
  actions,
  selected,
  disableToggleAll = false,
  header = '',
}: CheckboxColumnArgs<T>): ColumnDescriptor<
  Selectable<T & { id: string | null }>
> => ({
  header: disableToggleAll ? (
    header
  ) : (
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
  disableToggleAll: boolean;
  header?: string;
  lastColumn: boolean;
  onSelect: OnSelect<T>;
  onSelectAll?: OnSelectAll<T>;
};

const SelectableTable = <
  T extends unknown & { id: string | null; selected?: boolean }
>({
  tableShape,
  onSelect,
  onSelectAll,
  lastColumn = false,
  disableToggleAll = false,
  header,
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

  useEffect(() => {
    dispatch({ items, type: 'LOAD_ITEMS' });
  }, [items]);

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

  const checkboxColumnShape = checkboxColumn({
    actions,
    disableToggleAll,
    header,
    selected: state.selected,
  });

  return (
    <Table<Selectable<T>>
      {...tableProps}
      items={state.items}
      tableShape={
        lastColumn
          ? [...tableShape, checkboxColumnShape]
          : [checkboxColumnShape, ...tableShape]
      }
    />
  );
};

export default SelectableTable;
