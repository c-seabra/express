import moment from 'moment';
import React, { ReactElement } from 'react';

import { InvestorSessionsSummary } from '../../lib/types';
import {
  StyledColumnContainer,
  StyledGridContainer,
  StyledNoticeContainer,
} from './SessionsSummary.styled';

type SessionsSummaryProps = {
  investorSessionsSummaries: [InvestorSessionsSummary];
  timezone: string;
};

const SessionsSummary = ({
  investorSessionsSummaries,
  timezone,
}: SessionsSummaryProps): ReactElement => {
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
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={item.claimed === item.count ? 'full' : 'available'}
          >
            <span>
              {moment.tz(item?.startsAt, timezone).format('dddd')}:{' '}
              {moment.tz(item?.startsAt, timezone).format('HH:mm')} -{' '}
              {moment.tz(item?.endsAt, timezone).format('HH:mm')}
            </span>
            <span>
              {item.claimed} claimed out of {item.count}
            </span>
          </StyledColumnContainer>
        ))}
      </StyledGridContainer>
    </>
  );
};

export default SessionsSummary;
