import moment from 'moment'
import React, { ReactElement } from 'react'

import ContainerCard from '../../lib/components/atoms/ContainerCard'
import { InvestorSessionsSummary } from '../../lib/types'
import { SpacingBottom, StyledColumnContainer, StyledGridContainer } from './SessionsSummary.styled'

type SessionsSummaryProps = {
  investorSessionsSummary: InvestorSessionsSummary
}

const SessionsSummary = ({ investorSessionsSummary }: SessionsSummaryProps): ReactElement => {
  return (
    <ContainerCard color="#654DA0" title="Investor sessions summary">
      <SpacingBottom>
        <StyledGridContainer>
          {investorSessionsSummary?.map((item, i) => (
            <StyledColumnContainer
              key={i}
              className={item.claimed === item.count ? 'full' : 'available'}
            >
              <span>
                {moment(item?.startsAt).format('dddd')}: {moment(item?.startsAt).format('HH:mm')} -{' '}
                {moment(item?.endsAt).format('HH:mm')}
              </span>
              <span>
                {item.claimed} / {item.count}
              </span>
            </StyledColumnContainer>
          ))}
        </StyledGridContainer>
      </SpacingBottom>
    </ContainerCard>
  )
}

export default SessionsSummary
