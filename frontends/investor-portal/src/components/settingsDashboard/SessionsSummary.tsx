import moment from 'moment'
import React, { ReactElement } from 'react'

import { InvestorSessionsSummary } from '../../lib/types'
import {
  StyledColumnContainer,
  StyledGridContainer,
  StyledNoticeContainer,
} from './SessionsSummary.styled'

type SessionsSummaryProps = {
  investorSessionsSummaries: [InvestorSessionsSummary]
}

const SessionsSummary = ({ investorSessionsSummaries }: SessionsSummaryProps): ReactElement => {
  return (
    <>
      {investorSessionsSummaries.length < 1 && (
        <StyledNoticeContainer>
          <p>
            Currently there are no investor sessions. <br />
            Please enter the required details above to create a new session.
          </p>
        </StyledNoticeContainer>
      )}
      <StyledGridContainer>
        {investorSessionsSummaries?.map((item, i) => (
          <StyledColumnContainer
            key={i}
            className={item.claimed === item.count ? 'full' : 'available'}
          >
            <span>
              {moment(item?.startsAt).format('dddd')}: {moment(item?.startsAt).format('HH:mm')} -{' '}
              {moment(item?.endsAt).format('HH:mm')}
            </span>
            <span>
              {item.claimed} claimed out of {item.count}
            </span>
          </StyledColumnContainer>
        ))}
      </StyledGridContainer>
    </>
  )
}

export default SessionsSummary
