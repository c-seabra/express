import moment from 'moment'
import React, { ReactElement } from 'react'

import { InvestorSessionsSummary } from '../../lib/types'
import {
  StyledColumnContainer,
  StyledGridContainer,
  StyledNoticeContainer,
} from './SessionsSummary.styled'

type SessionsSummaryProps = {
  investorSessionsSummary: [InvestorSessionsSummary]
}

const SessionsSummary = ({ investorSessionsSummary }: SessionsSummaryProps): ReactElement => {
  return (
    <>
      {investorSessionsSummary.length < 1 && (
        <StyledNoticeContainer>
          <p>
            Currently there are no inverstor sessions. <br />
            Please enter the details above to create a new session.
          </p>
        </StyledNoticeContainer>
      )}
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
              {item.claimed} claimed out of {item.count}
            </span>
          </StyledColumnContainer>
        ))}
      </StyledGridContainer>
    </>
  )
}

export default SessionsSummary
