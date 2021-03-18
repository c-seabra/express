import { RateType, TaxType } from '@websummit/graphql/src/@types/operations';
import React from 'react';

import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';
import { useTaxRateCreateOperation } from '../../operations/mutations/TaxRateCreate';
import TaxRateCreateModal from './TaxRateCreateModal';

export type ModalInputMode = 'EDIT' | 'ADD';
type TaxRateCreateModalProps = {
  closeModal: () => void;
  eventId: string;
  isOpen: boolean;
  mode?: ModalInputMode;
  refetch?: any;
};

const TaxRateCreateModalWrapper = ({
  isOpen,
  closeModal,
  refetch,
  eventId,
  mode = 'ADD',
}: TaxRateCreateModalProps) => {
  const alertHeaderText = (_mode: string): string => {
    return switchCase({
      ADD: 'Add a new tax',
      EDIT: `Edit a ${'test'} tax`,
    })('')(_mode);
  };

  const submitText = (_mode: string): string => {
    return switchCase({
      ADD: 'Add to event',
      EDIT: 'Edit to event',
    })('')(_mode);
  };

  const { taxRateCreate } = useTaxRateCreateOperation();
  const setMutation = (e: {
    country: string;
    eventId: string;
    name: string;
    type: TaxType;
    value: number;
  }) => {
    const input = {
      countryId: e.country,
      eventId,
      name: e.name.trim(),
      rateType: RateType.Percentage,
      taxType: e.type,
      value: Number(e.value),
    };

    return taxRateCreate({ input, refetch });
  };

  return (
    <TaxRateCreateModal
      alertHeader={alertHeaderText(mode)}
      cancelText="Cancel"
      closeModal={closeModal}
      isOpen={isOpen}
      mode={mode}
      mutationCallback={setMutation}
      submitText={submitText(mode)}
    />
  );
};

export default TaxRateCreateModalWrapper;
