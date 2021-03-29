import React from 'react';

import LegalEntityCreateModal from './LegalEntityCreateModal';
import { useLegalEntityCreateOperation } from '../../operations/mutations/LegalEntityCreate';

type LegalEntityCreateModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  refetch?: any;
};

const LegalEntityCreateModalWrapper = ({
  isOpen,
  closeModal,
  refetch,
}: LegalEntityCreateModalProps) => {
  const { createLegalEntity } = useLegalEntityCreateOperation();
  const setMutation = (values: any) => {
    console.log('values from mutation', values);
    return createLegalEntity({
      input: {
        name: values.name,
        email: 'test@websummit.net',
      },
    });
  };
  return (
    <LegalEntityCreateModal
      alertHeader="Add new host company"
      cancelText="Cancel"
      closeModal={closeModal}
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Confirm"
    />
  );
};

export default LegalEntityCreateModalWrapper;
