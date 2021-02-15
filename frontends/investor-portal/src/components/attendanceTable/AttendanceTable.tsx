import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react'

import { ContainerCard, Heading, Modal, SecondaryButton, useModalState } from '../../lib/components'
import useAttendanceAppearanceSelectionUpdateMutation from '../../lib/hooks/useAttendanceAppearanceSelectionUpdateMutation'
import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery'
import useSearchState from '../../lib/hooks/useSearchState'
import Loader from '../../lib/Loading'
import Pagination from '../../lib/Pagination'
import AttendanceItem from '../attendanceItem/AttendanceItem'
import AttendanceListHeader from '../attendanceListHeader/AttendanceListHeader'
import { FiltersSearchContainer, SearchFilters, StyledSearchInput } from './AttendanceTable.styled'

type AttendanceSearchState = {
  page: string
  searchQuery?: string
  type: string
}

const AttendanceTable = (): ReactElement => {
  const { isOpen, openModal, closeModal } = useModalState()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [headerCheckbox, setHeaderCheckbox] = useState(false)
  const [headerCheckboxState, setHeaderCheckboxState] = useState(true)

  const processInitialSearchState = (state: AttendanceSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery)
  }

  const { searchState, setSearchState } = useSearchState<AttendanceSearchState>({
    processInitialSearchState,
  })

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
    type: searchState.type,
  })

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newSelectedValues = (selectedValues.includes(value) &&
      selectedValues.filter(item => item !== value)) || [...selectedValues, value]
    setSelectedValues(newSelectedValues)
  }

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage })
      setSelectedValues([])
    }
  }, [currentPage])

  useEffect(() => {
    const activeCheckboxesCount = results.filter(attendance => attendance.pendingSelectionCount).length
    if (
      results.length > 0 &&
      activeCheckboxesCount &&
      activeCheckboxesCount === selectedValues.length
    ) {
      setHeaderCheckbox(true)
    } else {
      setHeaderCheckbox(false)
    }

    if (results.filter(result => result.pendingSelectionCount).length) {
      setHeaderCheckboxState(false)
    } else {
      setHeaderCheckboxState(true)
    }
  }, [selectedValues, results])

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement
      setSearchState(prevState => ({ ...prevState, searchQuery: element.value }))
      setSearchQuery(element.value)
      setSelectedValues([])
    }
  }

  const onHeaderCheckboxChange = () => {
    setHeaderCheckbox(!headerCheckbox)
    if (!headerCheckbox) {
      setSelectedValues(
        results.filter(attendance => attendance.pendingSelectionCount).map(result => result.id)
      )
    } else {
      setSelectedValues([])
    }
  }

  const { updateAttendanceAppearanceSelections } = useAttendanceAppearanceSelectionUpdateMutation({
    attendanceIds: selectedValues,
  })

  const onDeleteConfirmed = () => {
    updateAttendanceAppearanceSelections()
    setSelectedValues([])
    closeModal()
  }

  return (
    <>
      <SearchFilters>
        <Heading>Attendance area</Heading>
        <FiltersSearchContainer>
          <SecondaryButton disabled={selectedValues.length === 0} onClick={openModal}>
            Submit investors selections
          </SecondaryButton>
          <Modal
            defaultFooterIsDestructive
            withDefaultFooter
            defaultFooterPositiveButtonAction={onDeleteConfirmed}
            defaultFooterPositiveButtonText="Update"
            description={`You are going to submit selections of ${selectedValues.length} investors.\n\nThis action can not be un-done!`}
            isOpen={isOpen}
            title="Are you sure?"
            onRequestClose={closeModal}
          />
          <StyledSearchInput
            defaultValue={searchQuery}
            placeholder="Search by Attendance name."
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
          />
        </FiltersSearchContainer>
      </SearchFilters>
      {!loading && !error ? (
        <ContainerCard noPadding>
          <>
            <AttendanceListHeader
              isChecked={headerCheckbox}
              isDisabled={headerCheckboxState}
              onCheckboxChange={onHeaderCheckboxChange}
            />
            {results.map(attendance => (
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
  )
}

export default AttendanceTable
