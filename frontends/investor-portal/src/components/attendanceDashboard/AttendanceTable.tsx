import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react';

import {
  ContainerCard,
  FilterButton,
  Heading,
  Modal,
  SecondaryButton,
  useModalState,
} from '../../lib/components';
import PopupButton from '../../lib/components/molecules/PopupButton';
import useAttendanceAppearanceSelectionUpdateMutation from '../../lib/hooks/useAttendanceAppearanceSelectionUpdateMutation';
import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery';
import useSearchState from '../../lib/hooks/useSearchState';
import Loader from '../../lib/Loading';
import Pagination from '../../lib/Pagination';
import AttendanceItem from './AttendanceItem';
import AttendanceListHeader from './AttendanceListHeader';
import {
  FiltersSearchContainer,
  PopupFiltersContainer,
  SearchFilters,
  StyledSearchInput,
} from './AttendanceTable.styled';
import SelectionStatusesCategoryList from './SelectionStatusesCategoryList';

type AttendanceSearchState = {
  page: string;
  searchQuery?: string;
  selectionStatuses?: string;
  type: string;
};

const AttendanceTable = (): ReactElement => {
  const { isOpen, openModal, closeModal } = useModalState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [headerCheckbox, setHeaderCheckbox] = useState(false);
  const [headerCheckboxDisabled, setHeaderCheckboxDisabled] = useState(true);

  const processInitialSearchState = (state: AttendanceSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery);
  };

  const { searchState, setSearchState } = useSearchState<AttendanceSearchState>(
    {
      processInitialSearchState,
    },
  );

  const {
    results,
    currentPage,
    error,
    loading,
    isForwardDisabled,
    isBackwardsDisabled,
    nextPage,
    previousPage,
  } = useAttendancesQuery({
    initialPage: searchState.page,
    searchQuery: searchState.searchQuery,
    selectionStatuses: searchState.selectionStatuses,
    type: searchState.type,
  });

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newSelectedValues = (selectedValues.includes(value) &&
      selectedValues.filter((item) => item !== value)) || [
      ...selectedValues,
      value,
    ];
    setSelectedValues(newSelectedValues);
  };

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage });
      setSelectedValues([]);
    }
  }, [currentPage]);

  useEffect(() => {
    const activeCheckboxesCount = results.filter(
      (attendance) =>
        attendance.attendanceAppearanceSelectionsDetails.pendingSelectionCount,
    ).length;
    setHeaderCheckbox(
      results.length > 0 &&
        !!activeCheckboxesCount &&
        activeCheckboxesCount === selectedValues.length,
    );
    setHeaderCheckboxDisabled(
      !results.filter(
        (result) =>
          result.attendanceAppearanceSelectionsDetails.pendingSelectionCount,
      ).length,
    );
  }, [selectedValues, results]);

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement;
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: element.value,
      }));
      setSearchQuery(element.value);
      setSelectedValues([]);
    }
  };

  const onHeaderCheckboxChange = () => {
    setHeaderCheckbox(!headerCheckbox);
    setSelectedValues(
      headerCheckbox
        ? []
        : results
            .filter(
              (attendance) =>
                attendance.attendanceAppearanceSelectionsDetails
                  .pendingSelectionCount,
            )
            .map((result) => result.id),
    );
  };

  const {
    updateAttendanceAppearanceSelections,
  } = useAttendanceAppearanceSelectionUpdateMutation({
    attendanceIds: selectedValues,
  });

  const onUpdateConfirmed = async () => {
    await updateAttendanceAppearanceSelections();
    setSelectedValues([]);
    closeModal();
  };

  const handleSelectionStatusFilterChange = (selectedTypes: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectionStatuses:
        selectedTypes?.length > 0 ? selectedTypes.join(',') : undefined,
    }));
    setSelectedValues([]);
  };

  return (
    <>
      <SearchFilters>
        <Heading>Attendance area</Heading>
        <FiltersSearchContainer>
          <SecondaryButton
            disabled={selectedValues.length === 0}
            onClick={openModal}
          >
            Submit investors selections
          </SecondaryButton>
          <Modal
            withDefaultFooter
            defaultFooterPositiveButtonAction={onUpdateConfirmed}
            defaultFooterPositiveButtonText="Update"
            description={`You are going to submit selections of ${
              selectedValues.length
            } investor${selectedValues.length > 1 ? 's' : ''}.`}
            isOpen={isOpen}
            title="Are you sure?"
            onRequestClose={closeModal}
          />
          <StyledSearchInput
            defaultValue={searchQuery}
            placeholder="Search by Attendance name."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
          />
          <PopupButton renderButton={(props) => <FilterButton {...props} />}>
            <PopupFiltersContainer>
              <SelectionStatusesCategoryList
                initialValues={searchState?.selectionStatuses?.split(',')}
                onSelectionStatusFilterChange={
                  handleSelectionStatusFilterChange
                }
              />
            </PopupFiltersContainer>
          </PopupButton>
        </FiltersSearchContainer>
      </SearchFilters>
      {!loading && !error ? (
        <ContainerCard noPadding>
          <>
            <AttendanceListHeader
              isChecked={headerCheckbox}
              isDisabled={headerCheckboxDisabled}
              onCheckboxChange={onHeaderCheckboxChange}
            />
            {results.map((attendance) => (
              <AttendanceItem
                key={attendance.id}
                attendance={attendance}
                isChecked={selectedValues.includes(attendance.id)}
                onCheckboxChange={onCheckboxChange}
              />
            ))}
          </>
        </ContainerCard>
      ) : (
        <Loader />
      )}
      {!loading && !error && (
        <Pagination
          isForwardDisabled={isForwardDisabled}
          isPreviousDisabled={isBackwardsDisabled}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </>
  );
};

export default AttendanceTable;
