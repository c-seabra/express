import React, { ReactElement } from 'react'
import { ApolloError } from '@apollo/client'

import { Investor } from '../../lib/types'
import InvestorItem, { InvestorListHeader } from '../investorItem/InvestorItem'
import Loader from '../../lib/Loading'

type InvestorListProps = {
  error?: ApolloError
  list: Investor[]
  loading: boolean
}

const InvestorList = ({ list = [], loading, error }: InvestorListProps): ReactElement => {
  if (loading) {
    return <Loader />
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <InvestorListHeader />
      {list.map(investor => (
        <InvestorItem key={investor.id} investor={investor} />
      ))}
    </>
  )
}

export default InvestorList
