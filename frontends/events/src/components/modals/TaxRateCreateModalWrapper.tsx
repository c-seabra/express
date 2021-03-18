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
  prefilledTax?: any;
  refetch?: any;
};

const TaxRateCreateModalWrapper = ({
  isOpen,
  closeModal,
  refetch,
  eventId,
  mode = 'ADD',
  prefilledTax,
}: TaxRateCreateModalProps) => {
  const alertHeaderText = (_mode: string): string => {
    return switchCase({
      ADD: 'Add a new tax',
      EDIT: `Edit a ${prefilledTax?.name || 'N/A'} tax`,
    })('')(_mode);
  };

  const submitText = (_mode: string): string => {
    return switchCase({
      ADD: 'Add to event',
      EDIT: 'Edit to event',
    })('')(_mode);
  };

  const { taxRateCreate } = useTaxRateCreateOperation();
  const pickMutation = (_mode: ModalInputMode, eventData: any) => {
    let mutation;
    const input = {
      countryId: eventData.country,
      eventId,
      name: eventData.name.trim(),
      rateType: RateType.Percentage,
      taxType: eventData.type,
      value: Number(eventData.value),
    };

    if(_mode === 'ADD') {
      mutation = taxRateCreate({ input, refetch });
    }

    if(_mode === 'EDIT') {
      mutation = taxRateCreate({ input, refetch });
    }

    return mutation;
  }
  const setMutation = (eventData: {
    country: string;
    eventId: string;
    name: string;
    type: TaxType;
    value: number;
  }) => {
    return pickMutation(mode, eventData)
  };

  return (
    <TaxRateCreateModal
      alertHeader={alertHeaderText(mode)}
      cancelText="Cancel"
      closeModal={closeModal}
      isOpen={isOpen}
      mode={mode}
      mutationCallback={setMutation}
      prefilledTax={prefilledTax}
      submitText={submitText(mode)}
    />
  );
};

export default TaxRateCreateModalWrapper;
