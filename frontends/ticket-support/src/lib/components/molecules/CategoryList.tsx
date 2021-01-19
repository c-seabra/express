import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'

const List = styled.div<{ headerColor?: string }>`
  display: flex;
  flex-direction: column;
  width: 125px;
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
`

const Header = styled.div<{ headerColor?: string }>`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: #fff;

  background-color: ${props => props.headerColor};
  margin-bottom: 0.2rem;
  padding: 0.2rem 0.5rem;
  font-weight: 600;
`

const useCategoryList = ({
  isMultiSelect = false,
  items = [],
}: {
  isMultiSelect?: boolean
  items: CategoryItem[]
}) => {
  const [controlledItems, setControlledItems] = useState(items)

  const toggleItem = (selectedItem: CategoryItem) => {
    if (isMultiSelect) {
      setControlledItems(prevState =>
        prevState.map(item => {
          if (item.value === selectedItem.value) {
            return {
              ...item,
              isSelected: !item.isSelected,
            }
          }

          return item
        })
      )
    } else {
      setControlledItems(prevState =>
        prevState.map(item => {
          if (item.value === selectedItem.value) {
            return {
              ...item,
              isSelected: !item.isSelected,
            }
          }

          return {
            ...item,
            isSelected: false,
          }
        })
      )
    }
  }

  return {
    controlledItems,
    toggleItem,
  }
}

export type CategoryItem = { isSelected?: boolean; label: string; value: string }

type CategoryListProps = {
  headerColor?: string
  isMultiSelect?: boolean
  items?: CategoryItem[]
  onMultiClick?: (selectedItems: CategoryItem[]) => void
  onSingleClick?: (item: CategoryItem) => void
  title?: string
}

const CategoryList = ({
  headerColor = '#654DA0',
  isMultiSelect = false,
  items = [],
  onMultiClick = () => null,
  onSingleClick = () => null,
  title = '',
}: CategoryListProps): ReactElement => {
  const { controlledItems, toggleItem } = useCategoryList({ isMultiSelect, items })

  const handleClick = (item: CategoryItem) => {
    toggleItem(item)
    if (isMultiSelect) {
      onMultiClick(controlledItems)
    } else {
      onSingleClick(item)
    }
  }

  return (
    <List headerColor={headerColor}>
      <Header headerColor={headerColor}>{title}</Header>
      {controlledItems.map(item => (
        <button
          key={item.value}
          data-is-selected={item.isSelected}
          type="button"
          onClick={() => handleClick(item)}
        >
          {item.label}
        </button>
      ))}
    </List>
  )
}

export default CategoryList
