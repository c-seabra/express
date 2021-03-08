import React from 'react';

import { Tooltip } from '../../lib/components';
import { SecondaryButton } from '../../lib/components/atoms/Button';
import { useModalState } from '../../lib/components/molecules/Modal';
import useMagicLinkMutation from '../../lib/hooks/useMagicLinkMutation';
import { Account } from '../../lib/types';
import { TextHighlight } from '../order/OrderDetails';
import GenerateLoginLinkModal from './GenerateLoginLinkModal';

type LoginLinkGenerateProps = {
  assignee: Account;
  isDisabled: boolean;
};

const LoginLinkGenerate = ({
  assignee,
  isDisabled = false,
}: LoginLinkGenerateProps) => {
  const { isOpen, closeModal, openModal } = useModalState();

  const { generateLoginLink, loading, error, data } = useMagicLinkMutation({
    assignee,
  });

  if (loading) return <p>Generating login link...</p>;

  if (error) return <p>Error generating login link. Reason {error.message}</p>;

  if (data)
    return (
      <Tooltip copyToClip value={data.assignmentMagicLinkGenerate.loginLink}>
        <TextHighlight>Generated login link</TextHighlight>
      </Tooltip>
    );

  return (
    <>
      <SecondaryButton disabled={isDisabled} type="button" onClick={openModal}>
        Generate login link
      </SecondaryButton>
      <GenerateLoginLinkModal
        generateLink={generateLoginLink}
        isOpen={isOpen}
        onRequestClose={closeModal}
      />
    </>
  );
};

export default LoginLinkGenerate;
