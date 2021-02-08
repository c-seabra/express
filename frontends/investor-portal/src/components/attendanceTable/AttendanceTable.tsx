import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react'

import { ContainerCard, Heading } from '../../lib/components'
import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery'
import useSearchState from '../../lib/hooks/useSearchState'
import Pagination from '../../lib/Pagination'
import AttendanceList from '../attendanceList/AttendanceList'
import { FiltersSearchContainer, SearchFilters, StyledSearchInput } from './AttendanceTable.styled'

type AttendanceSearchState = {
  page: string
  searchQuery?: string
  type: string
}

const AttendanceTable = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('')

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

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage })
    }
  }, [currentPage])

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement
      setSearchState(prevState => ({ ...prevState, searchQuery: element.value }))
      setSearchQuery(element.value)
    }
  }

  return (
    <>
      <SearchFilters>
        <Heading>Attendance area</Heading>
        <FiltersSearchContainer>
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
      <ContainerCard noPadding>
        <AttendanceList error={error} list={results} loading={loading} />
      </ContainerCard>
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
