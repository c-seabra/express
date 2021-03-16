import Modal from '@websummit/components/src/molecules/Modal';
import React from 'react';

import { useTaxRateCreateOperation } from '../../operations/mutations/TaxRateCreate';
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
  // const setMutation = (e: TaxRateCreateReque) => {
  const setMutation = (e: any) => {
      console.log(e)
    // return taxRateCreate({ id: e.id, reason: e.reason });
  };

  return (
    <TaxRateCreateModal
      alertHeader="Add new tax"
      alertText="test"
      cancelText="Cancel"
      closeModal={closeModal}
      headerText="test"
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Add to event"
    />
  );
};

export default TaxRateCreateModalWrapper;
