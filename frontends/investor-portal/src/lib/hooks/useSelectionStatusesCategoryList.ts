import { useState } from 'react';

import { CategoryItem } from '../components/molecules/CategoryList';
import { AttendanceAppearanceSelectionsStatus } from '../types';

const useSelectionStatusesCategoryList = ({
  initialValues = [],
  onSelectionStatusFilterChange,
}: {
  initialValues?: string[];
  onSelectionStatusFilterChange: (selectedTypes: string[]) => void;
}) => {
  const [selectedSelectionStatuses, setSelectedSelectionStatuses] = useState<
    string[]
  >(initialValues);

  const selectionStatusesOptions: CategoryItem[] = Object.entries(
    AttendanceAppearanceSelectionsStatus,
  ).map(([key, value]) => ({
    isSelected: selectedSelectionStatuses?.some((status) => key === status),
    label: value,
    value: `${key}`,
  }));

  const handleSelectionStatusFilterChange = (selectedItems: CategoryItem[]) => {
    const selectedStatuses = selectedItems
      .filter(({ isSelected }) => isSelected)
      .map(({ value }) => value);

    onSelectionStatusFilterChange(selectedStatuses);
    setSelectedSelectionStatuses(selectedStatuses);
  };

  return {
    handleSelectionStatusFilterChange,
    selectionStatusesOptions,
  };
};

export default useSelectionStatusesCategoryList;
