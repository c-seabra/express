import React, { ReactElement } from 'react';

import CategoryList from '../../lib/components/molecules/CategoryList';
import useSelectionStatusesCategoryList from '../../lib/hooks/useSelectionStatusesCategoryList';

type SelectionStatusesCategoryListProps = {
  initialValues?: string[];
  onSelectionStatusFilterChange?: (selectedTypes: string[]) => void;
};

const SelectionStatusesCategoryList = ({
  initialValues = [],
  onSelectionStatusFilterChange = () => null,
}: SelectionStatusesCategoryListProps): ReactElement => {
  const { selectionStatusesOptions, handleSelectionStatusFilterChange } =
    useSelectionStatusesCategoryList({
      initialValues,
      onSelectionStatusFilterChange,
    });

  return (
    <CategoryList
      isMultiSelect
      headerColor="#654DA0"
      items={selectionStatusesOptions}
      title="Selection status"
      onMultiClick={handleSelectionStatusFilterChange}
    />
  );
};

export default SelectionStatusesCategoryList;
