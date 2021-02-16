import React, { ReactElement, useState } from 'react'

import { CategoryListContainer, Header } from './CategoryList.styled'

const useCategoryList = ({
  isMultiSelect = false,
  items = [],
  onMultiClick = () => null,
  onSingleClick = () => null,
}: {
  isMultiSelect?: boolean
  items: CategoryItem[]
  onMultiClick?: (selectedItems: CategoryItem[]) => void
  onSingleClick?: (item: CategoryItem) => void
}) => {
  const [controlledItems, setControlledItems] = useState(items)

  const toggleItem = (selectedItem: CategoryItem) => {
    if (isMultiSelect) {
      setControlledItems(prevState => {
        const newState = prevState.map(item => {
          if (item.value === selectedItem.value) {
            return {
              ...item,
              isSelected: !item.isSelected,
            }
          }

          return item
        })
        onMultiClick(newState)
        return newState
      })
    } else {
      setControlledItems(prevState =>
        prevState.map(item => {
          if (item.value === selectedItem.value) {
            const newItem = {
              ...item,
              isSelected: !item.isSelected,
            }

            onSingleClick(newItem)
            return newItem
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
  const { controlledItems, toggleItem } = useCategoryList({
    isMultiSelect,
    items,
    onMultiClick,
    onSingleClick,
  })

  return (
    <CategoryListContainer headerColor={headerColor}>
      <Header headerColor={headerColor}>{title}</Header>
      {controlledItems.map(item => (
        <button
          key={item.value}
          data-is-selected={item.isSelected}
          type="button"
          onClick={() => toggleItem(item)}
        >
          {item.label}
        </button>
      ))}
    </CategoryListContainer>
  )
}

export default CategoryList
