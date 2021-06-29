import { TicketQuery } from '@websummit/graphql/src/@types/operations';
import {
  extractTypeFromMaybe,
  GetQueryResult,
} from '@websummit/graphql/src/lib/types';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { SecondaryButton } from '../../lib/components/atoms/Button';
import { useModalState } from '../../lib/components/molecules/Modal';
import useSendLoginLinkMutation from '../../lib/hooks/useSendLoginLinkMutation';
import { formatDateTime } from '../../lib/utils/time';
import LoginLinkGenerate from './LoginLinkGenerate';
import SendLoginLinkModal from './SendLoginLinkModal';

const Text = styled.div`
  opacity: 0.5;
  color: #07143e;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 17px;
  margin-top: 4px;

  a {
    color: #337ab7;
  }
`;

const RowContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const LoginLinkGeneratorContainer = styled.div`
  display: flex;
  font-size: 1rem;
  align-items: center;
  margin-right: 1rem;

  p {
    margin: 0;
  }
`;

type Assignee = NonNullable<
  extractTypeFromMaybe<GetQueryResult<TicketQuery, 'ticket'>['assignment']>
>['assignee'];

const LoginLinkActions = ({
  assignee,
  isTicketVoided,
}: {
  assignee: Assignee;
  isTicketVoided: boolean;
}): ReactElement => {
  const [
    lastLoginLinkRequestedAt,
    setLastLoginLinkRequestedAt,
  ] = useState<string>();
  const { isOpen, openModal, closeModal } = useModalState();

  const { sendLoginLink } = useSendLoginLinkMutation({ assignee });

  if (
    assignee?.lastLoginTokenCreatedAt &&
    assignee?.lastLoginTokenCreatedAt !== lastLoginLinkRequestedAt
  ) {
    setLastLoginLinkRequestedAt(assignee.lastLoginTokenCreatedAt);
  }

  return (
    <>
      {lastLoginLinkRequestedAt ? (
        <Text>
          Last login link requested at:{' '}
          {formatDateTime(lastLoginLinkRequestedAt)}
        </Text>
      ) : (
        <Text>No login links requested for assignee</Text>
      )}
      <Text>
        <a
          href={`https://metabase.cilabs.com/question/1184?email=${
            assignee?.email || ''
          }`}
          rel="noreferrer"
          target="_blank"
        >
          Check Ticket Machine emails sent to assignee on metabase
        </a>
      </Text>
      <RowContainer>
        <LoginLinkGeneratorContainer>
          <LoginLinkGenerate assignee={assignee} isDisabled={isTicketVoided} />
        </LoginLinkGeneratorContainer>

        <SecondaryButton disabled={isTicketVoided} onClick={openModal}>
          Send assignee login link email
        </SecondaryButton>
        <SendLoginLinkModal
          isOpen={isOpen}
          sendLink={sendLoginLink}
          onRequestClose={closeModal}
        />
      </RowContainer>
    </>
  );
};

export default LoginLinkActions;
