import { RateType, TaxType } from '@websummit/graphql/src/@types/operations';
import React from 'react';

import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';
import {ModalInputMode} from "../../lib/types/modals";
// import { useTaxRateUpdateOperation } from '../../operations/mutations/TaxRateUpdate';
import SaleCycleModal from './SaleCycleModal';


type TaxRateCreateModalProps = {
  closeModal: () => void;
  data?: any;
  eventId: string;
  isOpen: boolean;
  mode?: ModalInputMode;
  refetch?: any;
};

const SaleCycleModalWrapper = ({
  isOpen,
  closeModal,
  refetch,
  eventId,
  mode = 'ADD',
  data,
}: TaxRateCreateModalProps) => {
  const alertHeaderText = (_mode: string): string => {

    return switchCase({
      ADD: 'Create a sale cycle',
      EDIT: `Edit sale cycle`,
    })('')(_mode);
  };

  const submitText = (_mode: string): string => {
    return switchCase({
      ADD: 'Create',
      EDIT: 'Edit',
    })('')(_mode);
  };

  const taxRateCreate  = () => {};
  // TODO ADD update
  // const { taxRateUpdate } = useTaxRateUpdateOperation();
  const pickMutation = (_mode: ModalInputMode, eventData: any) => {
    let mutation;
    const input = {
      countryId: eventData.country,
      eventId,
      id: eventData.id,
      name: eventData.name.trim(),
      rateType: RateType.Percentage,
      taxType: eventData.type,
      value: Number(eventData.value),
    };

    if (_mode === 'ADD') {
      mutation = taxRateCreate({ input, refetch });
    }

    // if (_mode === 'EDIT') {
    //   mutation = taxRateUpdate({ input, refetch });
    // }

    return mutation;
  };
  const setMutation = (eventData: {
    country: string;
    eventId: string;
    id: string;
    name: string;
    type: TaxType;
    value: number;
  }) => {
    return pickMutation(mode, eventData);
  };

  return (
    <SaleCycleModal
      alertHeader={alertHeaderText(mode)}
      closeModal={closeModal}
      isOpen={isOpen}
      mode={mode}
      mutationCallback={setMutation}
      prefilledTax={data}
      submitText={submitText(mode)}
    />
  );
};

export default SaleCycleModalWrapper;
