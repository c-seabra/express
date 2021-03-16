import {
  RateType,
  TaxRateCreateInput,
} from '@websummit/graphql/src/@types/operations';
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
  const setMutation = (e: TaxRateCreateInput & { country: string }) => {
    console.log(e);
    const input: TaxRateCreateInput = {
      countryId: e.country,
      eventId: e.eventId,
      name: e.name,
      rateType: RateType.Percentage,
      taxType: e.taxType,
      value: e.value,
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
    />
  );
};

export default TaxRateCreateModalWrapper;
