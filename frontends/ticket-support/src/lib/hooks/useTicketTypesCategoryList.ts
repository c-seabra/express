import { useState } from 'react'

import { CategoryItem } from '../components/molecules/CategoryList'
import { TicketType } from '../types'

const useTicketTypesCategoryList = ({
  initialValues = [],
  ticketTypes = [],
  onTicketTypeFilterChange,
}: {
  initialValues?: string[]
  onTicketTypeFilterChange: (selectedTypes: string[]) => void
  ticketTypes?: TicketType[]
}) => {
  const [selectedTicketTypes, setSelectedTicketTypes] = useState<string[]>(initialValues)

  const ticketTypesOptions: CategoryItem[] = ticketTypes.map(({ id, name }) => ({
    isSelected: selectedTicketTypes?.some(selectedId => id === selectedId),
    label: name,
    value: `${id}`,
  }))

  const handleTicketTypeFilterChange = (selectedItems: CategoryItem[]) => {
    const selectedTypes = selectedItems
      .filter(({ isSelected }) => isSelected)
      .map(({ value }) => value)

    onTicketTypeFilterChange(selectedTypes)
    setSelectedTicketTypes(selectedTypes)
  }

  return {
    handleTicketTypeFilterChange,
    ticketTypesOptions,
  }
}

export default useTicketTypesCategoryList
