import {
  CommerceTaxRateType, CommerceTaxType,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';

import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';
import { useTaxRateCreateOperation } from '../../operations/mutations/TaxRateCreate';
import { useTaxRateUpdateOperation } from '../../operations/mutations/TaxRateUpdate';
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
    const prefilledTaxName: string = prefilledTax?.name || 'N/A';

    return switchCase({
      ADD: 'Add a new tax',
      EDIT: `Edit a ${prefilledTaxName} tax`,
    })('')(_mode);
  };

  const submitText = (_mode: string): string => {
    return switchCase({
      ADD: 'Add to event',
      EDIT: 'Edit to event',
    })('')(_mode);
  };

  const { taxRateCreate } = useTaxRateCreateOperation();
  const { taxRateUpdate } = useTaxRateUpdateOperation();
  const pickMutation = (_mode: ModalInputMode, eventData: any) => {
    let mutation;
    const input = {
      country: eventData.country,
      eventId,
      id: eventData.id,
      name: eventData.name.trim(),
      rateAmount: Number(eventData.value),
      rateType: CommerceTaxRateType.Percentage,
      taxType: eventData.type,
    };

    if (_mode === 'ADD') {
      mutation = taxRateCreate({ input, refetch });
    }

    if (_mode === 'EDIT') {
      mutation = taxRateUpdate({ input, refetch });
    }

    return mutation;
  };
  const setMutation = (eventData: {
    country: string;
    eventId: string;
    id: string;
    name: string;
    type: CommerceTaxType;
    value: number;
  }) => {
    return pickMutation(mode, eventData);
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
