import { RateType, TaxType } from '@websummit/graphql/src/@types/operations';
import React from 'react';

import { useTaxRateCreateOperation } from '../../operations/mutations/TaxRateCreate';
import TaxRateCreateModal from './TaxRateCreateModal';

type TaxRateCreateModalProps = {
  closeModal: () => void;
  eventId: string;
  isOpen: boolean;
  mode?: 'EDIT' | 'ADD';
  refetch?: any;
};

const TaxRateCreateModalWrapper = ({
  isOpen,
  closeModal,
  refetch,
  eventId,
    mode = 'ADD',
}: TaxRateCreateModalProps) => {
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
      alertHeader="Add a new tax"
      cancelText="Cancel"
      closeModal={closeModal}
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Add to event"
      mode={mode}
    />
  );
};

export default TaxRateCreateModalWrapper;
