import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react'

import ContainerCard from '../../lib/components/atoms/ContainerCard'
import TextHeading from '../../lib/components/atoms/Heading'
import useInvestorsQuery from '../../lib/hooks/useInvestorsQuery'
import useSearchState from '../../lib/hooks/useSearchState'
import Pagination from '../../lib/Pagination'
import InvestorList from '../investorList/InvestorList'
import { FiltersSearchContainer, SearchFilters, StyledSearchInput } from './InvestorTable.styled'

type InvestorSearchState = {
  page: string
  searchQuery?: string
  type: string
}

const InvestorTable = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('')

  const processInitialSearchState = (state: InvestorSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery)
  }

  const { searchState, setSearchState } = useSearchState<InvestorSearchState>({
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
  } = useInvestorsQuery({
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
        <TextHeading>Attendance area</TextHeading>
        <FiltersSearchContainer>
          <StyledSearchInput
            defaultValue={searchQuery}
            placeholder="Search by Investor name."
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
          />
        </FiltersSearchContainer>
      </SearchFilters>
      <ContainerCard noPadding>
        <InvestorList error={error} list={results} loading={loading} />
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

export default InvestorTable
