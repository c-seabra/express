import React from 'react';

import {TaxRateCreateRequest, useTaxRateCreateOperation} from '../../operations/mutations/TaxRateCreate';
import TaxRateCreateModal from './TaxRateCreateModal';

type TaxRateCreateModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  refetch?: any;
};

const TaxRateCreateModalWrapper = ({
  isOpen,
  closeModal,
  refetch,
}: TaxRateCreateModalProps) => {
  const { taxRateCreate } = useTaxRateCreateOperation();
  const setMutation = (e: TaxRateCreateRequest) => {
    console.log(e);
    return taxRateCreate({ id: e.id, reason: e.reason });
  };

  return (
    <TaxRateCreateModal
      alertHeader="Add a new tax"
      cancelText="Cancel"
      closeModal={closeModal}
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Add to event"
    />
  );
};

export default TaxRateCreateModalWrapper;
