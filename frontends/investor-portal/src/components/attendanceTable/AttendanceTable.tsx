import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react'

import { Button, ContainerCard, Heading, SecondaryButton } from '../../lib/components'
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
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  // const [results, setresults] = useState<string[]>([])
  const [headerCheckbox, setHeaderCheckbox] = useState(false)

  const processInitialSearchState = (state: AttendanceSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery)
  }

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const a = (selectedValues.includes(value) && selectedValues.filter(item => item !== value)) || [
      ...selectedValues,
      value,
    ]
    setSelectedValues(a)
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

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage })
    }
    setSelectedValues([])
  }, [currentPage])

  useEffect(() => {
    if (results.length > 0 && results.length === selectedValues.length) {
      setHeaderCheckbox(true)
    } else {
      setHeaderCheckbox(false)
    }
  }, [selectedValues, results])

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement
      setSearchState(prevState => ({ ...prevState, searchQuery: element.value }))
      setSearchQuery(element.value)
    }
  }

  const onHeaderCheckboxChange = () => {
    setHeaderCheckbox(!headerCheckbox)
    if (!headerCheckbox) {
      setSelectedValues(results.map(result => result.id))
    } else {
      setSelectedValues([])
    }
  }

  return (
    <>
      <SearchFilters>
        <Heading>Attendance area</Heading>
        <FiltersSearchContainer>
          <SecondaryButton onClick={() => console.log('click')}>
            Submit investors selections
          </SecondaryButton>
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
      {
        !loading && !error ? (
          <ContainerCard noPadding>
            <>
              <AttendanceListHeader
                isChecked={headerCheckbox}
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
