import {
  CommerceTaxRateType,
  EventConfigurationCountry,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';

import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';
import { useTaxRateCreateOperation } from '../../operations/mutations/TaxRateCreate';
import { useTaxRateUpdateOperation } from '../../operations/mutations/TaxRateUpdate';
import TaxRateCreateModal from './TaxRateCreateModal';

export type ModalInputMode = 'EDIT' | 'ADD';
type TaxRateCreateModalProps = {
  closeModal: () => void;
  countries: EventConfigurationCountry[];
  isOpen: boolean;
  mode?: ModalInputMode;
  prefilledTax?: any;
};

const TaxRateCreateModalWrapper = ({
  isOpen,
  closeModal,
  mode = 'ADD',
  prefilledTax,
  countries,
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
    console.log('eventData', eventData);
    const input = {
      country: eventData.country,
      id: eventData.id,
      name: eventData.name.trim(),
      rateAmount: Number(eventData.value),
      rateType: CommerceTaxRateType.Percentage,
      taxType: { id: eventData.type },
    };
    const foundCountry: any = countries.find(
      (country) => country.id === eventData.country, // need to remap from id
    );
    const mappedInput = {
      ...input,
      country: foundCountry.code,
    };

    if (_mode === 'ADD') {
      mutation = taxRateCreate({ input: mappedInput });
    }

    if (_mode === 'EDIT') {
      mutation = taxRateUpdate({ input: mappedInput });
    }

    return mutation;
  };
  const setMutation = (eventData: {
    country: string;
    id: string;
    name: string;
    type: any;
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
