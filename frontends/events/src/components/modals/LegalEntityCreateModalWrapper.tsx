import React from 'react';

import { useLegalEntityCreateOperation } from '../../operations/mutations/LegalEntityCreate';
import LegalEntityCreateModal from './LegalEntityCreateModal';

type LegalEntityCreateModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  // refetch?: any;
};

const LegalEntityCreateModalWrapper = ({
  isOpen,
  closeModal,
}: // refetch,
LegalEntityCreateModalProps) => {
  const { createLegalEntity } = useLegalEntityCreateOperation();
  const setMutation = (values: any) => {
    return createLegalEntity({
      input: {
        name: values.name.trim(),
      },
    });
  };
  return (
    <LegalEntityCreateModal
      alertHeader="Add new host company"
      closeModal={closeModal}
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Confirm"
    />
  );
};

export default LegalEntityCreateModalWrapper;
